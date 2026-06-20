// BEAM — stealth landing page
// Handles the email signup gesture. There's no backend yet:
// see the marked spot in submit() to wire this to Resend (or any form endpoint).

(function () {
  var email = document.getElementById('email');
  var join = document.getElementById('join');
  var note = document.getElementById('note');
  var signup = document.getElementById('signup');
  var done = document.getElementById('done');

  function valid(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function submit() {
    var v = email.value.trim();
    if (!valid(v)) {
      note.textContent = 'Enter a valid email to join.';
      note.style.color = '#f2c14e';
      email.focus();
      return;
    }

    // ─────────────────────────────────────────────────────────────
    // WIRE UP BACKEND HERE
    // Send `v` (the email) to your Resend endpoint / form handler.
    // Example:
    //   fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: v })
    //   });
    // Until then, we just show the success state.
    // ─────────────────────────────────────────────────────────────

    signup.classList.add('hide');
    done.classList.add('show');
  }

  join.addEventListener('click', submit);
  email.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submit();
  });
  email.addEventListener('input', function () {
    note.textContent = 'No spam. One signal when we surface.';
    note.style.color = '';
  });
})();
