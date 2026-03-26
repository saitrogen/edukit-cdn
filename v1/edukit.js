// edukit.js — hosted on CDN
(function () {
  window.EduKit = {
    render: function (selector, config) {
      const el = document.querySelector(selector);
      if (!el) {
        console.warn("EduKit: no element found for selector \"" + selector + "\"");
        return;
      }
      if (config.component !== "quiz") {
        console.warn("EduKit: unsupported component \"" + config.component + "\"");
        return;
      }

      const { title, questions } = config.data;
      let current = 0, score = 0;

      function renderQuestion() {
        const q = questions[current];

        const container = document.createElement("div");
        container.setAttribute("style", "font-family:sans-serif;max-width:500px;margin:auto;padding:20px");

        const heading = document.createElement("h2");
        heading.textContent = title;
        container.appendChild(heading);

        const prompt = document.createElement("p");
        const bold = document.createElement("b");
        bold.textContent = "Q" + (current + 1) + ":";
        prompt.appendChild(bold);
        prompt.appendChild(document.createTextNode(" " + q.q));
        container.appendChild(prompt);

        q.options.forEach(function (opt) {
          const btn = document.createElement("button");
          btn.textContent = opt;
          btn.setAttribute("style", "display:block;margin:8px 0;padding:10px 20px;width:100%;cursor:pointer;border:1px solid #ccc;border-radius:8px");
          btn.addEventListener("click", function () {
            if (opt === q.answer) score++;
            current++;
            if (current < questions.length) {
              renderQuestion();
            } else {
              const result = document.createElement("div");
              result.setAttribute("style", "text-align:center;font-family:sans-serif;padding:40px");
              const scoreHeading = document.createElement("h2");
              scoreHeading.textContent = "Score: " + score + "/" + questions.length + " \uD83C\uDF89";
              result.appendChild(scoreHeading);
              el.replaceChildren(result);
            }
          });
          container.appendChild(btn);
        });

        const counter = document.createElement("small");
        counter.textContent = (current + 1) + " / " + questions.length;
        container.appendChild(counter);

        el.replaceChildren(container);
      }

      renderQuestion();
    }
  };
})();
