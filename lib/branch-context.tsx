"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from "react";

/** مفتاح حفظ الفرع المختار في المتصفح */
const BRANCH_KEY = "o2-selected-branch";

export interface Branch {
    id: string;
    name: string;
    phone: string;
    address: string;
    region: string;
}

interface BranchContextType {
    selectedBranch: string | null;
    setSelectedBranch: (branchId: string) => void;
    getBranchInfo: (branchId: string) => Branch | null;
    onBranchChange: (callback: () => void) => void;
}

export const BRANCHES: Record<string, Branch> = {
    gaza: {
        id: "gaza",
        name: "O2 - غزة",
        phone: "972569000400",
        address: "شارع النصر",
        region: "محافظة غزة",
    },
    middle: {
        id: "middle",
        name: "O2 - الوسطى",
        phone: "972597111811",
        address: "النصيرات - شارع أبو صرار",
        region: "محافظة الوسطى",
    },
};

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }: { children: ReactNode }) {
    /**
     * الفرع المختار يُحفظ في المتصفح ويُستعاد عند كل زيارة.
     * كان ثابتاً على "gaza" دائماً، فيعود التصفّح لغزة مع كل تحديث
     * بينما يظن الزبون أنه في الفرع الذي اختاره — ومن هنا جاءت
     * رسالة «متوفر في الفرع الأوسط» وهو أصلاً يتصفّح الأوسط.
     */
    const readStored = (): string | null => {
        if (typeof window === "undefined") return null;
        try {
            // "branch" مفتاح قديم تستعمله صفحتا الأقسام واختيار الفرع
            const v =
                window.localStorage.getItem(BRANCH_KEY) ||
                window.localStorage.getItem("branch");
            return v && BRANCHES[v] ? v : null;
        } catch {
            return null;
        }
    };

    const [selectedBranch, setSelectedBranchState] = useState<string | null>(
        () => readStored() || "gaza",
    );
    const branchChangeCallbackRef = useRef<(() => void) | null>(null);

    // مزامنة بعد الترطيب (SSR لا يرى localStorage)
    useEffect(() => {
        const stored = readStored();
        if (stored && stored !== selectedBranch) setSelectedBranchState(stored);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBranchInfo = useCallback((branchId: string): Branch | null => {
        return BRANCHES[branchId] || null;
    }, []);

    const onBranchChange = useCallback((callback: () => void) => {
        branchChangeCallbackRef.current = callback;
    }, []);

    const setSelectedBranch = useCallback((branchId: string) => {
        try {
            if (typeof window !== "undefined") {
                window.localStorage.setItem(BRANCH_KEY, branchId);
                window.localStorage.setItem("branch", branchId);   // توافق
            }
        } catch {
            /* التخزين معطّل — الاختيار يبقى للجلسة فقط */
        }
        setSelectedBranchState((prevBranch) => {
            if (prevBranch !== branchId && branchChangeCallbackRef.current) {
                branchChangeCallbackRef.current();
            }
            return branchId;
        });
    }, []);

    return (
        <BranchContext.Provider
            value={{
                selectedBranch,
                setSelectedBranch,
                getBranchInfo,
                onBranchChange,
            }}
        >
            {children}
        </BranchContext.Provider>
    );
}

export function useBranch() {
    const context = useContext(BranchContext)
    if (context === undefined) {
        throw new Error("useBranch must be used within BranchProvider");
    }
    return context;
}
