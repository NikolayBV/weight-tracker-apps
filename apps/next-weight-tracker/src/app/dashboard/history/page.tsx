"use client";

import {useWeightStore} from "@/stores/weightStore";
import {useSortedWeights} from "@/utils/hooks/useSortedWeights";
import HistoryTab from "@/components/ui/histrory-tab/HistoryTab";
import React, {useCallback, useMemo} from "react";
import {IconArrowsUpDown} from "@tabler/icons-react";
import {Table} from "@mantine/core";
import MenuButton from "@/components/ui/menu-button/MenuButton";

export default function HistoryPage() {
    const weights = useWeightStore((state) => state.userWeight);
    const { sortBy, sortOrder, handleSort } = useSortedWeights();

    const rows = useMemo(() => {
        return weights.map((el) => (
            <Table.Tr key={el.id}>
                <Table.Td>{el.weight}</Table.Td>
                <Table.Td>{new Date(el.date).toLocaleDateString("ru-RU")}</Table.Td>
                <Table.Td>
                    <MenuButton weight={el} />
                </Table.Td>
            </Table.Tr>
        ))
    }, [weights]);
    
    const renderIcon = useCallback(
        (key: "weight" | "date") => {
            if (sortBy !== key) return <IconArrowsUpDown size="0.9rem" stroke={1.5} />;
            return sortOrder === "asc" ? <span>▲</span> : <span>▼</span>;
        },
        [sortBy, sortOrder]
    );


    return (
        <HistoryTab handleSort={handleSort} renderIcon={renderIcon} rows={rows} />
    );
}