<script>
    function createCalendar() {
        let search = 'history';
        let values = Object.keys(localStorage).filter((key) => key.startsWith(search)).map((key) => localStorage[key]);
        values.forEach(historyString => {
            const history = JSON.parse(historyString);
            history.forEach(newHistory => {
                let calendarDate = new Date(newHistory.date).toJSON().split("T")[0];
                let calendarArray = JSON.parse(localStorage.getItem("calendar") || "[]");
                let currentCalendarDay = calendarArray.find(x => x.date == calendarDate);
                if (currentCalendarDay) {
                    if (!currentCalendarDay.exercises.includes(newHistory.exerciseId)) {
                        currentCalendarDay.exercises.push(newHistory.exerciseId);
                    }
                } else {
                    calendarArray.push(
                        {
                            date: calendarDate,
                            exercises: [newHistory.exerciseId]
                        }
                    );
                }

                localStorage.setItem("calendar", JSON.stringify(calendarArray));
            });
        });
    }
</script>

<button class="btn btn-primary" on:click={createCalendar}>Create calendar</button>