"use client";
import { ScrollArea, Table, Text, Box } from "@mantine/core";
import { IconArrowsUpDown } from "@tabler/icons-react";
import { useWeightStore } from "@/stores/weightStore";
import { useSortedWeights } from "@/utils/hooks/useSortedWeights";
import styles from "./history-tab.module.css";

export default function HistoryTab() {
    const weights = useWeightStore((state) => state.userWeight);
    const { sortBy, sortOrder, handleSort } = useSortedWeights();

    const renderIcon = (key: "weight" | "date") => {
        if (sortBy !== key) return <IconArrowsUpDown size="0.9rem" stroke={1.5} />;
        return sortOrder === "asc" ? <span>▲</span> : <span>▼</span>;
    };

    const rows = weights.map((el) => (
        <Table.Tr key={el.id}>
            <Table.Td>{el.weight}</Table.Td>
            <Table.Td>{new Date(el.date).toLocaleDateString("ru-RU")}</Table.Td>
        </Table.Tr>
    ));

    return (
        <div className={styles.tab}>
            <Text size="xl" fw={500} mb="md">
                История веса
            </Text>

            {weights.length === 0 ? (
                <p>Нет данных</p>
            ) : (
                <ScrollArea h={250}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>
                                    <Box onClick={() => handleSort("weight")} style={{ display: "inline-flex", gap: 4, cursor: "pointer", alignItems: "center" }}>
                                        Вес {renderIcon("weight")}
                                    </Box>
                                </Table.Th>
                                <Table.Th>
                                    <Box onClick={() => handleSort("date")} style={{ display: "inline-flex", gap: 4, cursor: "pointer", alignItems: "center" }}>
                                        Дата {renderIcon("date")}
                                    </Box>
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </ScrollArea>
            )}
        </div>
    );
}