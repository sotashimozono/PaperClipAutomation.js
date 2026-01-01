export const ProjectManager = {
  excludeList: ["Release the HypnoDrones"],

  executeAll: function () {
    const projects = document.getElementsByClassName("projectButton");
    for (let btn of projects) {
      if (!btn.disabled && btn.style.display !== "none") {
        const projectName = btn.innerText;

        if (this.excludeList.some((ex) => projectName.includes(ex))) continue;

        btn.click();
        console.log(`[Project] Executed: ${projectName}`);
      }
    }
  },
};
