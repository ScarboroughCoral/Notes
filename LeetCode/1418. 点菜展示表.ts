function displayTable(orders: string[][]): string[][] {
    let rowsMap = new Map<string,Map<string,number>>();
    let foodSet = new Set<string>(orders.map(order => order[2]));
    for (let [,tableNumber, foodItem] of orders) {
        const foodCountMap = rowsMap.get(tableNumber)
            ?? new Map<string,number>([...foodSet].map(food => [food, 0]));
        foodCountMap.set(foodItem, (foodCountMap.get(foodItem) ?? 0) + 1);
        rowsMap.set(tableNumber, foodCountMap);
    }

    return [['Table', ...[...foodSet].sort((name1,name2) => name1 < name2 ? -1 : 1)]].concat(
        [...rowsMap]
            .sort(([table1Number], [table2Number]) => Number(table1Number) - Number(table2Number))
            .map(([tableNumber, foodCounts]) => 
                [
                    tableNumber,
                    ...[...foodCounts].sort(([name1],[name2]) => name1 < name2 ? -1 : 1).map(([,count]) => String(count))
                ]
            )
    )
        
};
