const notesInput = document.getElementById("notes");
const charCount = document.getElementById("charCount");
const output = document.getElementById("output");

const sampleNotes = `Cloud computing delivers computing services such as servers, storage, databases, networking, and software over the internet.
Key benefits include scalability, cost efficiency, flexibility, and access from different locations.
Cloud deployment models include public cloud, private cloud, and hybrid cloud.
Public cloud services are shared across customers, while private cloud resources are dedicated to one organisation.
A hybrid cloud combines public and private cloud environments.
Cloud service models include IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service).`;

notesInput.addEventListener("input", () => {
  charCount.textContent = `${notesInput.value.length.toLocaleString()} / 12,000 characters`;
});

document.getElementById("sampleBtn").addEventListener("click", () => {
  notesInput.value = sampleNotes;
  charCount.textContent = `${notesInput.value.length.toLocaleString()} / 12,000 characters`;
});

function getSentences(text) {
  return text.replace(/\s+/g, " ").split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
}

function showMessage(title, content, label) {
  output.classList.remove("empty");
  output.replaceChildren();

  const labelEl = document.createElement("p");
  labelEl.className = "result-label";
  labelEl.textContent = label;
  output.appendChild(labelEl);

  const titleEl = document.createElement("h3");
  titleEl.className = "result-title";
  titleEl.textContent = title;
  output.appendChild(titleEl);

  if (Array.isArray(content)) {
    const list = document.createElement("ul");
    content.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    output.appendChild(list);
  } else {
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    output.appendChild(paragraph);
  }

  const foot = document.createElement("p");
  foot.className = "notice";
  foot.textContent = "Demo mode: this is a basic local preview, not AI-generated output yet.";
  output.appendChild(foot);
}

function checkNotes() {
  const text = notesInput.value.trim();
  if (text.length < 20) {
    showMessage("Add a little more detail", "Paste at least a few sentences of notes so LazyStudy AI has something to work with.", "WAIT A MOMENT");
    return null;
  }
  return text;
}

document.getElementById("summarizeBtn").addEventListener("click", () => {
  const text = checkNotes();
  if (!text) return;
  const sentences = getSentences(text);
  const summary = sentences.length > 4
    ? [sentences[0], sentences[Math.floor(sentences.length / 2)], sentences[sentences.length - 1]]
    : sentences;
  showMessage("Your quick summary", summary, "✦ REVIVED SUMMARY");
});

document.getElementById("questionsBtn").addEventListener("click", () => {
  const text = checkNotes();
  if (!text) return;
  const sentences = getSentences(text);
  const questions = sentences.slice(0, 5).map((sentence, index) => {
    const clean = sentence.replace(/[.!?]+$/, "");
    return `Question ${index + 1}: Explain this idea in your own words — “${clean}.”`;
  });
  showMessage("Test your memory", questions, "☾ REVISION QUESTIONS");
});

// Start with the empty state.
output.classList.add("empty");
