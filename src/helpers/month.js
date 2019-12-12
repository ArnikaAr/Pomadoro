export default function (data) {
    const date = new Date(data);
    let month = date.toLocaleString('default', {month: 'long'});
    let todayDate = new Date();
    if (date.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0)) {
        this.deadlineDay = '';
        return (month = 'today');
    }
    return month;
}