export class ArrayHelper {
    public static Contains(item: any, list: Array<any>) {
        if (list && item) {
            return list.includes(item);
        }
    }
}