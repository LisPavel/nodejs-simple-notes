console.log("app connected");

const removeNote = async (id) => {
    return fetch(`/${id}`, { method: "DELETE" });
};

document.addEventListener("click", (ev) => {
    const { target } = ev;
    if (target.dataset.type === "remove") {
        removeNote(target.dataset.id).then(target.closest("li").remove());
        // console.log("remove", target.dataset.id);
    }
});
