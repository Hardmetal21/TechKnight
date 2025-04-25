document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');

            // Закрити всі
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
                ans.style.maxHeight = null;
                ans.style.padding = '0 20px';
            });

            // Відкрити поточну
            if (!isActive) {
                answer.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 25 + 'px';
                answer.style.padding = '15px 20px';
            }
        });
    });
});