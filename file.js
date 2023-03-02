const a = {
    Tasks: [{ name: "dev", id: "1" }, { name: "back", id: "2" }],
    Submission: [{ id: "1" }]
}

a.Tasks.map((t) => {
    a.Submission.map(s => {
        if (s.id === t.id) {
            console.log(t.name, t.id);
        }
        else {
            console.log(t.name);
        }
    })
})