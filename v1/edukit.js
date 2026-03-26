// edukit.js — hosted on CDN
(function () {
  window.EduKit = {
    render: function (selector, config) {
      const el = document.querySelector(selector);
      if (!el || config.component !== "quiz") return;

      const { title, questions } = config.data;
      let current = 0, score = 0;

      function renderQuestion() {
        const q = questions[current];
        el.innerHTML = `
          <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:20px">
            <h2>${title}</h2>
            <p><b>Q${current + 1}:</b> ${q.q}</p>
            ${q.options.map(opt => `
              <button onclick="EduKit._answer('${selector}','${opt}')"
                style="display:block;margin:8px 0;padding:10px 20px;
                       width:100%;cursor:pointer;border:1px solid #ccc;border-radius:8px">
                ${opt}
              </button>`).join("")}
            <small>${current + 1} / ${questions.length}</small>
          </div>`;
      }

      EduKit._answer = function (sel, chosen) {
        const q = questions[current];
        if (chosen === q.answer) score++;
        current++;
        if (current < questions.length) renderQuestion();
        else document.querySelector(sel).innerHTML =
          `<div style="text-align:center;font-family:sans-serif;padding:40px">
            <h2>Score: ${score}/${questions.length} 🎉</h2>
          </div>`;
      };

      renderQuestion();
    }
  };
})();
