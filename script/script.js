const totalJobElement = document.getElementById("totalJob");
const interviewCountElement = document.getElementById("interviewCount");
const rejectedCountElement = document.getElementById("rejectedCount");
const availableJobCountElement = document.getElementById("availableJobCount");

let totalJobs = document.querySelectorAll(".job-card").length;
let interviewCount = 0;
let rejectedCount = 0;

const allJobsContainer = document.getElementById("allJobs");
const interviewJobsContainer = document.getElementById("interviewJobs");
const rejectedJobsContainer = document.getElementById("rejectedJobs");

function updateCounts() {
  totalJobElement.innerText = totalJobs;
  interviewCountElement.innerText = interviewCount;
  rejectedCountElement.innerText = rejectedCount;

  const activeTab = document.querySelector(".btn-primary").id;
  if (activeTab === "allTab") {
    const visibleJobs = allJobsContainer.querySelectorAll(".job-card").length;
    availableJobCountElement.innerText = visibleJobs + " Job(s)";

  } else if (activeTab === "interviewTab") {
    availableJobCountElement.innerText = interviewCount + " Job(s)";
  } else if (activeTab === "rejectedTab") {
    availableJobCountElement.innerText = rejectedCount + " Job(s)";
  }
}


document.querySelectorAll(".deleteBtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".job-card");
    const status = card.getAttribute("data-status");
    card.remove();
    totalJobs--;
    if (status === "interview") interviewCount--;
    if (status === "rejected") rejectedCount--;
    updateCounts();
  });
});

document.querySelectorAll(".interviewBtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".job-card");
    const prevStatus = card.getAttribute("data-status");
    if (prevStatus === "rejected") rejectedCount--;
    if (prevStatus !== "interview") interviewCount++;
    card.setAttribute("data-status", "interview");
    interviewJobsContainer.appendChild(card);
    const interviewHidden = document.getElementById("interviewHidden");
    interviewHidden.classList.add("hidden");
    const approveBtn = this.closest(".job-card").querySelector(".interviewAprove");
    approveBtn.classList.remove("hidden");
       const approveBtn1 =this.closest(".job-card").querySelector(".requiredApply");
    approveBtn1.classList.add("hidden");


    


    updateCounts();
  });
});

document.querySelectorAll(".rejectBtn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".job-card");
    const prevStatus = card.getAttribute("data-status");
    if (prevStatus === "interview") interviewCount--;
    if (prevStatus !== "rejected") rejectedCount++;
    card.setAttribute("data-status", "rejected");
    rejectedJobsContainer.appendChild(card);
    availableJobCount--;
    const rejectedJobs = document.getElementById("rejectedHidden");
    rejectedJobs.classList.add("hidden");
    const approveBtn =this.closest(".job-card").querySelector(".requiredApply");
    approveBtn.classList.remove("hidden");
    const approveBtn1 =this.closest(".job-card").querySelector(".interviewAprove");
    approveBtn1.classList.add("hidden");
    updateCounts();
  });
});

document.getElementById("allTab").addEventListener("click", () => {
  allJobsContainer.classList.remove("hidden");
  interviewJobsContainer.classList.add("hidden");
  rejectedJobsContainer.classList.add("hidden");
  const allTab = document.getElementById("allTab");
  allTab.classList.add("btn-primary");
  const interviewTab = document.getElementById("interviewTab");
  interviewTab.classList.remove("btn-primary");
  const rejectedTab = document.getElementById("rejectedTab");
  rejectedTab.classList.remove("btn-primary");
  
});

document.getElementById("interviewTab").addEventListener("click", () => {
  const allTab = document.getElementById("allTab");
  allTab.classList.remove("btn-primary");
  const rejectedTab = document.getElementById("rejectedTab");
  rejectedTab.classList.remove("btn-primary");
  const interviewTab = document.getElementById("interviewTab");
  interviewTab.classList.add("btn-primary");
  allJobsContainer.classList.add("hidden");
  interviewJobsContainer.classList.remove("hidden");
  rejectedJobsContainer.classList.add("hidden");
   updateCounts();
});

document.getElementById("rejectedTab").addEventListener("click", () => {
  allJobsContainer.classList.add("hidden");
  interviewJobsContainer.classList.add("hidden");
  rejectedJobsContainer.classList.remove("hidden");
  const allTab = document.getElementById("allTab");
  allTab.classList.remove("btn-primary");
  const rejectedTab = document.getElementById("rejectedTab");
  rejectedTab.classList.add("btn-primary");
  const interviewTab = document.getElementById("interviewTab");
  interviewTab.classList.remove("btn-primary");
   updateCounts();
});
