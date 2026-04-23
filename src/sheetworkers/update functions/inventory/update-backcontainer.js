function UpdateBackContainer() {
    let containers = {
        "backpack": {
            size: 3,
            capacity: 30
        },
        "travel pack": {
            size: 5,
            capacity: 50
        }
    };

    getAttrs(["containerBack_name"], function(values) {
        let container = values.containerBack_name || "";
        let listContainer = containers[container.toLowerCase()];

        if(listContainer !== undefined) {
            setAttrs({
                containerBack_size: ""+listContainer.size,
                containerBack_capacity: listContainer.capacity
            });
        }
    });
}