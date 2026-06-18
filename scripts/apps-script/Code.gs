// Lead receiver for nicolemickle.com
// Deployed as a Web App; URL lives in the Next.js app as SHEETS_URL (server-only).
// Flow: contact/quiz form -> /api/lead (proxy) -> doPost here -> append row + notify.
//
// IMPORTANT: the email notification is intentionally isolated from the Sheet write.
// A lead is "captured" the moment its row is appended. An email failure must NEVER
// block capture or surface an error to the visitor, so sends run through safeSend()
// and doPost returns { ok: true } as long as the row was written.

const NOTIFY_EMAIL = "nicole@nicolemickle.com"; // lead notifications go here only
const TEST_EMAIL = "samrahim8@gmail.com";       // used ONLY by authorizeMailScope's one-time test, never by real leads
const SENDER_NAME = "Nicole Mickle Website";

// Run this once from the editor after deploying to (re)grant the MailApp scope.
// Sends a single test to TEST_EMAIL (Sam) so you can confirm sending works, and logs
// the remaining daily quota — if that prints 0, quota is the culprit, not authorization.
// This is the ONLY mail Sam ever receives; real leads go to Nicole alone.
function authorizeMailScope() {
  MailApp.sendEmail({
    to: TEST_EMAIL,
    name: SENDER_NAME,
    subject: "Apps Script auth test (one-time)",
    body:
      "MailApp is authorized.\n\n" +
      "Remaining daily quota: " + MailApp.getRemainingDailyQuota(),
  });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = new Date();

    if (data.formType === "Contact") {
      ss.getSheetByName("Contact").appendRow([
        timestamp,
        data.firstName || "",
        data.lastName || "",
        data.email || "",
        data.phone || "",
        data.interest || "",
        data.message || "",
      ]);
      safeSend(function () { sendContactEmail(data); });
    } else if (data.formType === "Quiz") {
      const a = data.answers || {};
      ss.getSheetByName("Quiz").appendRow([
        timestamp,
        data.email || "",
        data.persona || "",
        a.reason || "",
        a.lifestyle || "",
        a.budget || "",
        a.construction || "",
        a.commute || "",
      ]);
      safeSend(function () { sendQuizEmail(data, a); });
    } else {
      return json({ ok: false, error: "Unknown formType" });
    }

    // Row written = lead captured. Email outcome does not affect this response.
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Runs the email send in isolation. A failure here is logged (visible in the
// Executions tab) but swallowed, so the lead is never lost and the form never errors.
function safeSend(fn) {
  try {
    fn();
  } catch (err) {
    console.error("Lead email failed to send: " + err);
  }
}

function sendContactEmail(d) {
  const name = `${d.firstName || ""} ${d.lastName || ""}`.trim() || "Unknown";
  const subject = `New website lead — ${name}`;
  const body = [
    `New contact form submission from nicolemickle.com`,
    ``,
    `Name:     ${name}`,
    `Email:    ${d.email || "—"}`,
    `Phone:    ${d.phone || "—"}`,
    `Interest: ${d.interest || "—"}`,
    ``,
    `Message:`,
    d.message || "(none)",
    ``,
    `—`,
    `Reply directly to this email to respond.`,
  ].join("\n");

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    name: SENDER_NAME,
    subject: subject,
    body: body,
    replyTo: d.email || undefined,
  });
}

function sendQuizEmail(d, a) {
  const subject = `New quiz lead — top match: ${d.persona || "(none)"}`;
  const body = [
    `New neighborhood quiz submission from nicolemickle.com`,
    ``,
    `Email:        ${d.email || "—"}`,
    `Top match:    ${d.persona || "—"}`,
    ``,
    `Their answers:`,
    `  Reason:       ${a.reason || "—"}`,
    `  Lifestyle:    ${a.lifestyle || "—"}`,
    `  Budget:       ${a.budget || "—"}`,
    `  Construction: ${a.construction || "—"}`,
    `  Commute:      ${a.commute || "—"}`,
    ``,
    `—`,
    `Reply directly to this email to follow up.`,
  ].join("\n");

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    name: SENDER_NAME,
    subject: subject,
    body: body,
    replyTo: d.email || undefined,
  });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
