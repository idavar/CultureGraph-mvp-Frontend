/**
 * @description function used for update old data object with new data
 * @param oldObject contain old data object value
 * @param updatedProperties contain new updated data
 */
export const updateObject = (oldObject, updatedProperties) => {
		return {
				...oldObject,
				...updatedProperties
		};
};

/**
 * @description function used for refresh the page
 */
 export const pageReload = () => {
	window.location.reload();
 };

