import { ReactNode } from "react";

export interface LayoutPageProps {
    children?: ReactNode
    select? : '1' | '2' | '3' | '4' | '5' | '6'
}