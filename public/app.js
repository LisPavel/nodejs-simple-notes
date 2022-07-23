console.log("app connected");

const removeNote = async (id) => {
    return fetch(`/${id}`, { method: "DELETE" });
};
const editNote = (id, title) => {
    return fetch(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title }),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

document.addEventListener("click", (ev) => {
    const { target } = ev;
    if (target.dataset.type === "remove") {
        removeNote(target.dataset.id).then(() => target.closest("li").remove());
        // console.log("remove", target.dataset.id);
    }
    if (target.dataset.type === "edit") {
        const updatedText = prompt("Enter new note", target.dataset.note);
        editNote(target.dataset.id, updatedText);
    }
});
