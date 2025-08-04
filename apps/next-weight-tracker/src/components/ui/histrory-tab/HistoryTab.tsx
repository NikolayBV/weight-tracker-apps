"use client";
import {ScrollArea, Table, Text, Box} from "@mantine/core";
import styles from "./history-tab.module.css";
import React from "react";

interface HistoryTabProps {
    handleSort: (key: "weight" | "date") => void;
    renderIcon: (key: "weight" | "date") => React.ReactNode;
    rows: React.ReactNode[];
}

function HistoryTab({handleSort, renderIcon, rows }: HistoryTabProps) {

    return (
        <div className={styles.tab}>
            <Text size="xl" fw={500} mb="md">
                История веса
            </Text>

            {rows.length === 0 ? (
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
                                <Table.Th>
                                    <Box>
                                        Действия
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

export default React.memo(HistoryTab);