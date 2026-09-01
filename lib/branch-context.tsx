"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useRef } from "react";

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
    const [selectedBranch, setSelectedBranchState] = useState<string | null>("gaza");
    const branchChangeCallbackRef = useRef<(() => void) | null>(null);

    const getBranchInfo = useCallback((branchId: string): Branch | null => {
        return BRANCHES[branchId] || null;
    }, []);

    const onBranchChange = useCallback((callback: () => void) => {
        branchChangeCallbackRef.current = callback;
    }, []);

    const setSelectedBranch = useCallback((branchId: string) => {
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
