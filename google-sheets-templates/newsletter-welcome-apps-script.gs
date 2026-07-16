// Paste into Extensions > Apps Script on the Sheet linked to the
// "NuAspect – Newsletter Signup" Form (the one behind the Home page's
// "Write to Us" pill).
//
// This does NOT use the doGet() read-only pattern from apps-script.gs — it's
// a write-side trigger instead: every time someone submits the Form, it sends
// them the same welcome email automatically.
//
// Setup (after pasting this in):
//   1. Left sidebar clock icon ("Triggers") > Add Trigger
//   2. Choose function: sendWelcomeEmail
//   3. Event source: From form
//   4. Event type: On form submit
//   5. Save, then authorize when prompted — this is Google confirming the
//      script (which you wrote) can send email as you, not a third-party grant.
//
// Uses GmailApp (not MailApp): it sends as your real Gmail identity and logs
// a copy in your own Sent folder, so you can directly verify a send actually
// happened — useful since MailApp's success/failure is otherwise opaque.
//
// Sends "from" noreply@nuaspect.in instead of your personal address. For this
// to work, that address must first be added as an ALIAS of the Google account
// that owns this script (Google Workspace Admin Console > Directory > Users >
// [the account] > User information > Add alternate email > noreply@nuaspect.in).
// Workspace aliases work as a "from" address immediately — no separate Gmail
// "verify this address" email-confirmation step needed, since it's the same
// mailbox. If you haven't set that alias up yet, either do that first, or
// remove the `from` line below to send from your normal address in the
// meantime.
//
// Edit SUBJECT / BODY below any time to change what people receive —
// changes apply to the next signup immediately, no redeploy needed.

function sendWelcomeEmail(e) {
  // 'Email' must exactly match the Form question's title.
  var email = e.namedValues['Email'] && e.namedValues['Email'][0];
  if (!email) return;

  var SUBJECT = 'Welcome to NuAspect';
  var BODY = [
    'Hi there,',
    '',
    'Thank you for reaching out to NuAspect — a space where introspection meets',
    'intelligence, and reflection becomes direction.',
    '',
    'We are building a different kind of psychological ecosystem: clinical rigour',
    'paired with human curiosity, for people willing to sit with uncomfortable',
    'questions long enough to hear their own answers.',
    '',
    "You'll hear from us as new reflections, resources, and courses go live. In",
    'the meantime, feel free to explore the Knowledge Hub and take the',
    'Intellectual Assessment on our site.',
    '',
    'With care,',
    'The NuAspect Team'
  ].join('\n');

  GmailApp.sendEmail(email, SUBJECT, BODY, {
    from: 'noreply@nuaspect.in',
    name: 'NuAspect'
  });
}
