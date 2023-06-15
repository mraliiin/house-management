HousePad.Utils = {
    getArrayElement: function(items_array, item_id){
        for (var i=0; i < items_array.length; i++){
            if (parseInt(item_id) == parseInt(items_array[i].id)) {
                return items_array[i];
            }
        }

        return null;
    }
}