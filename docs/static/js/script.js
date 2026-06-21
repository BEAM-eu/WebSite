// BEAM — stealth landing page
// Signup posts to Buttondown via its embed-subscribe endpoint.
//
// ┌─────────────────────────────────────────────────────────────┐
// │  SET THIS: replace YOUR-USERNAME with your Buttondown        │
// │  username (the handle you pick when you create your          │
// │  Buttondown account). Nothing else needs to change.          │
// └─────────────────────────────────────────────────────────────┘
var BUTTONDOWN_USERNAME = 'BEAM-eu';

(function () {
  var email = document.getElementById('email');
  var join = document.getElementById('join');
  var note = document.getElementById('note');
  var signup = document.getElementById('signup');
  var done = document.getElementById('done');

  function valid(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function setNote(msg, warn) {
    note.textContent = msg;
    note.style.color = warn ? '#f2c14e' : '';
  }

  function succeed() {
    signup.classList.add('hide');
    done.classList.add('show');
  }

  function submit() {
    var v = email.value.trim();
    if (!valid(v)) {
      setNote('Enter a valid email to join.', true);
      email.focus();
      return;
    }

    // Guard against deploying with the placeholder still in place.
    if (BUTTONDOWN_USERNAME === 'YOUR-USERNAME') {
      setNote('Signup not configured yet (set Buttondown username).', true);
      return;
    }

    join.disabled = true;
    setNote('Joining…', false);

    var endpoint =
      'https://buttondown.com/api/emails/embed-subscribe/' +
      encodeURIComponent(BUTTONDOWN_USERNAME);

    // Buttondown's embed endpoint expects a form POST with `email`
    // AND the hidden `embed=1` field — without `embed=1` the
    // submission is silently ignored.
    var body = new FormData();
    body.append('email', v);
    body.append('embed', '1');

    // NOTE on `no-cors`: Buttondown's embed endpoint does not return
    // CORS headers, so the browser will not let us read the response
    // status or body. We therefore cannot programmatically distinguish
    // success from failure here — we treat a completed network request
    // as success. The real source of truth is your Buttondown
    // Subscribers list. (If you want true success/failure detection,
    // use a serverless proxy that calls the Buttondown API with your
    // API key and returns a readable response.)
    fetch(endpoint, { method: 'POST', body: body, mode: 'no-cors' })
      .then(function () {
        succeed();
      })
      .catch(function () {
        join.disabled = false;
        setNote('Something went wrong. Try again?', true);
      });
  }

  join.addEventListener('click', submit);
  email.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') submit();
  });
  email.addEventListener('input', function () {
    setNote('No spam. One signal when we surface.', false);
  });
})();
