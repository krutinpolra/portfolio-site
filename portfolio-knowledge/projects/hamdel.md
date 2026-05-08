# Hamdel Care Platform Knowledge Base

## Source And Scope

This knowledge base summarizes the Hamdel App SRS titled "Data Classification
and Use Cases" for Hamdel Pty Ltd. The project is a full-stack care-service
platform with three major surfaces:

- Care Receiver app: mobile, tablet, and desktop experience for the person
  requesting care, either for themselves or for a loved one.
- Care Giver app: mobile, tablet, and desktop experience for caregivers, nurses,
  aides, companions, therapists, and other service providers.
- Admin panel: desktop operational back office for orders, matching, users,
  finance, compliance, support, CMS, marketing, technical tools, reporting, and
  access control.

CR means Care Receiver, equivalent to patient/customer. CG means Care Giver,
equivalent to nurse/caregiver/provider.

The SRS emphasizes data classification, role-specific workflows, reusable
tables/dropdowns, consistent save/close behavior, reduced typing through
selection controls, and archiving excessive data so the app remains performant.

---

## Product Summary

Hamdel is a care marketplace and care-operations platform. A care receiver can
register, complete a profile, add loved ones, build an address book, request
care, select a care package, choose a matching method, pay into wallet/escrow,
chat during an active booking, review history, download invoices, and contact
support.

A caregiver can register, verify identity, submit credentials, upload
documents, choose service qualifications, complete tests, build a public
profile, manage availability, accept or bid on care requests, respond to
reviews, and receive payouts.

Admins manage the service lifecycle: approving caregivers, manually matching or
reassigning caregivers, handling tickets and complaints, managing payments and
refunds, maintaining FAQ/CMS content, reviewing compliance issues, monitoring
technical logs, exporting reports, and controlling role-based permissions.

---

## Quick Chatbot Summary

Use this summary for short recruiter answers, project card explanations, and
fast chatbot responses.

Hamdel Care Platform is a full-stack care-service platform built from a detailed
SRS. It models a real healthcare-adjacent marketplace with three user surfaces:
Care Receiver, Care Giver, and Admin Panel.

The Care Receiver side supports registration, KYC/OTP, profile completion,
recipient/loved-one management, medical information, address book, safety plans,
care requests, booking history, matching methods, wallet/payment flow, chat,
invoices, reviews, referrals, settings, AI-enabled FAQ, and support tickets.

The Care Giver side supports registration, KYC/OTP, business and qualification
profiles, credential evaluation, document upload, exams, badge assignment,
service abilities, appointment requests, availability calendar, live location,
reviews, referrals, settings, AI-enabled FAQ, and support tickets.

The Admin Panel supports role-based access for super admin, operations, customer
support, finance, CMS, marketing, compliance and safety, technical admin, data
analyst, content moderator, and custom roles. Admin modules include order
management, caregiver management, care receiver management, support operations,
finance/accounting, CMS, marketing tools, compliance and safety, technical logs,
reporting, audit logs, access control, internal notes, and escalation workflows.

Key technical themes include full-stack product decomposition, database
modeling, dropdown/reference data design, booking and matching logic,
wallet/escrow/payment workflows, chat moderation, role-based access control,
KYC/OTP flows, document verification, compliance-aware medical data handling,
and admin operational dashboards.

---

## Design Principles From The SRS

- Categorize features according to the app classifications: Care Receiver, Care
  Giver, and Admin Panel.
- Repetitive values should be modeled as editable tables or dropdown lists.
- CG and CR side-panel headings map to data areas that should be stored in the
  database.
- Prefer selection inputs and dropdowns over free typing where possible.
- Make save, window closing, and form progression consistent across the app.
- Archive excessive historical data to protect app loading speed.
- Use mandatory-field rules:
  - `*` means mandatory during first registration.
  - `**` means mandatory during profile completion.
- Use inline help or hover text for fields where users need guidance.

---

## Major User Types

### Care Receiver

The person requesting care. This can be the patient themselves or a person
booking care for a loved one.

### Care Giver

The person providing care. This may include nurses, nursing aides, companions,
therapists, dietitians, medical transport drivers, mobility assistants, and
other care-service providers.

### Admin

The operational staff controlling the platform. Admin roles are scoped by
permission level so each role can access only relevant modules and sensitive
data.

---

## Care Receiver App

### Care Request

The care request flow is the main customer workflow. It collects recipient,
address, medical, preference, duration, period, package, note, and matching
information before payment and caregiver assignment.

The booking form includes:

- Choose CR / recipient.
- Choose address.
- Choose duration and period of care.
- Review selected recipient information.
- Choose care package.
- Add notes up to 250 words.
- Validate required fields before continuing.
- Return users to incomplete fields until all mandatory data is provided.

Data destinations include:

- CR recipient list.
- CR address book.
- CR booking history.
- CR wallet after payment.

### Profile

Profile fields include:

- Name.
- Last name.
- Phone number, not a WhatsApp number.
- Email.
- Address.
- Emergency contact.

Emergency contact captures:

- Name.
- Last name.
- Contact number.
- Relationship from dropdown.
- Requirement that the contact lives in the same city.

### Booking History

Booking history lists current and past services from newest to oldest.

Active bookings:

- Appear near the top.
- Include chat access.
- Open a chat page similar to Telegram.
- Include a back arrow.
- Do not show a cancel button because an ongoing service must be cancelled
  through headquarters.

Completed bookings:

- Include downloadable PDF invoices after payment has been made to the caregiver
  and the service has officially ended.
- Keep the chatroom browsable but inactive.
- Can be filtered by recipient.

### Recipient List

Recipients include `Myself` and `My loved ones`.

For `Myself`, the system stores:

- Personal information read from profile.
- Medical information saved during care request flow.
- Preferences from tables/dropdowns, including caregiver sex, language, diaper
  change, and other preferences.
- Favorite caregivers imported from liked caregivers.
- Safety plan.
- Reviews given.
- Reviews received.
- Badges from dropdown list.

For `My loved ones`, users can add multiple loved ones with:

- Relationship from dropdown.
- Status and relationship details.
- Personal information.
- Medical information from care request flow.
- Preferences from tables/dropdowns.
- Favorite caregivers.
- Safety plan.
- Reviews given and received.
- Badges.

### Safety Plan

The safety plan captures trusted contacts for emergencies such as a fall,
sudden illness, or significant health/safety concern.

Safety contact fields:

- Name and last name.
- Relationship to the care receiver.
- Phone number.
- Option to add another contact.

### Address Book

The address book contains addresses from profile, the user themselves, and loved
ones. Users can add, edit, or remove addresses.

Address fields include:

- Region/state.
- City.
- Address.
- Living arrangement type: apartment, villa, condominium.
- Staircases to the house: 1-5, 5-10, 10-20, or lift.
- Staircases inside the house: 1-5, 5-10, 10-20, or lift.
- Optional residence phone number.
- Number of people in the residence and their relationship to the CR.
- Whether the CR is willing to share part of the home with the caregiver.
- Shared space detail: room or bed.
- Whether the CR is comfortable with the caregiver bringing children if needed.
- Whether the CR is willing to share food or ingredients with the caregiver.
- Food sharing options: food, ingredients, both, or no.
- Parking space: inside building, street, or none.
- Pets: cat, dog, both, or other.

### Invite Friends

Each user has a referral code. When a referred person successfully signs up and
completes a care request, both parties receive a $100 wallet credit for future
service purchases.

### Become A Caregiver

The care receiver can choose to become a caregiver. If accepted, the app
switches the user to the caregiver side and guides them through credential
evaluation.

### Settings

Settings include:

- Password change.
- Theme setting.
- Notifications.
- Text size.
- Language.
- Privacy and security.
- App version.
- About us.

### Help And Support Centre

Support includes:

- AI-enabled FAQ.
- Create a ticket.

### Other Care Receiver Sections

- Logout.
- Terms and conditions.

---

## Care Receiver Registration Flow

Use case: Customer registration.

ID: `CU-101`.

Actors:

- Customer.
- System.
- KYC service at `u-id.net`.
- KYC platform for non-Iranian residents.

Precondition:

- Customer has downloaded the app and navigated to registration.

Postconditions:

- Identity is verified through KYC.
- Customer has an account.
- Customer can request care for themselves or another person.

Main Iranian-phone flow:

1. Customer clicks registration.
2. System displays phone number field and an "I don't live in Iran" option.
3. Customer enters Iranian phone number.
4. System validates phone format.
5. System sends OTP by SMS.
6. Customer enters OTP.
7. System verifies OTP.
8. System redirects customer to `u-id.net` KYC.
9. KYC returns official name, last name, national ID, and age/date of birth.
10. System auto-fills profile completion form with verified data.
11. Customer uploads optional profile photo and confirms.
12. System saves profile photo, marks profile complete, and creates account.
13. System prompts for password and repeated password.
14. Password must include at least one uppercase character, one lowercase
    character, one number, one symbol from `@-!+*%$#`, and be at least six
    characters.
15. System logs user in, redirects to dashboard, and sends "Welcome, your
    account is active" notification.

Alternative non-Iranian flow:

- User selects "I don't live in Iran".
- System hides phone number and displays email address fields.
- System validates email format.
- System sends OTP.
- User completes KYC on the non-Iranian KYC platform.
- System receives verified name, last name, and age/date of birth.
- System follows the same profile confirmation, password, login, and welcome
  steps.

---

## Care Receiver Profile Completion Flow

Use case: Recipient's list.

ID: `CR-104`.

Purpose:

- Guide a newly registered CR through missing profile sections before requesting
  care.
- Save identity and health data for themselves and loved ones.
- Make the data accessible to the CR and admin.

Required before continuing:

- Profile.
- Address.
- Emergency contact.

Can be skipped temporarily:

- Recipient list.
- Address book.

If recipient list or address book is skipped, the system should warn that this
information is required before submitting a care request.

Each section should have its own save button for clarity.

Data destinations:

- CR profile.
- Recipient list.
- Address book.

---

## Care Receiver Care Request Flow

Use case: Request care service.

ID: `CU-102`.

Trigger:

- Customer clicks "Request Care".

Actors:

- Customer.
- Payment system.
- Electronic Health Record system.
- Map API.

Preconditions:

- Customer is registered and logged in.
- Customer navigates to Care Request.

Postconditions:

- Care request is submitted.
- Payment is made.
- Caregiver receives notification.

Care request steps:

1. Customer opens Care Request.
2. System displays Service Booking page.
3. User chooses recipient.
4. User chooses address.
5. User chooses duration and period of care.
6. User reviews recipient information from the selected recipient list entry.
7. User chooses a care package.
8. User adds notes up to 250 words.
9. System validates each selected option.
10. Continue is active only after required information is entered.
11. System saves provided care information under the recipient name for reuse.
12. Data appears in recipient list and booking history after successful
    matching.
13. System presents order creation / matching methods.
14. Customer chooses a matching method.
15. System processes payment through payment APIs.
16. Funds are held in wallet/escrow.
17. If no matching succeeds, the user can request that funds remain in wallet
    for future matching.

---

## Order Creation And Matching Methods

### Fast Request

- Fixed price.
- Customer posts request.
- Request is broadcast to available caregivers.
- First caregiver to accept gets the job.

### Pick A Top-Rated Caregiver In Your Area

- Fixed price.
- Customer browses top-rated caregiver profiles in the selected address area.
- Customer chooses a caregiver.
- System forwards offer to selected caregiver.
- Caregiver accepts or declines.
- If declined, system prompts customer to pick another caregiver.

### Marketplace Broadcasting

- Fixed price plus suggested tip.
- Customer posts job with preferred time such as tomorrow or next week.
- System suggests a tip based on demand and wait time.
- Caregivers can browse, bid on, or accept the job.

### Rebook A Previous Caregiver

- Fixed price.
- Customer selects a caregiver from previous booking history.
- Caregiver receives direct offer.
- Caregiver can accept or decline.
- If declined, customer must choose another caregiver.

---

## Care Giver App

### Profile

Caregiver profile includes:

- Business information.
- Qualifications.
- Private profile.
- Public profile.
- Live location in private profile.

### Services

Caregiver selects the services they are qualified and approved to provide.
Service choices should be tied to credential evaluation and admin approval.

### Appointments

Appointments include:

- Bookings.
- Requests.

### Availability

Availability includes:

- Area and location.
- Calendar.

### Reviews

Reviews are shown to the caregiver and the caregiver can respond.

### Invite Friends

Caregivers have referral codes. Referral reward logic is connected to successful
signup and completed care request through the referral code.

### Settings

Caregiver settings include allowing the app to access location.

### Help And Support Centre

Support includes:

- AI-enabled FAQ.
- Create a ticket.

### Other Caregiver Sections

- Logout.
- Terms and conditions.

---

## Care Giver Registration Flow

Use case: Care giver registration.

ID: `CG-201`.

Actors:

- Caregiver.
- System.
- KYC service at `u-id.net`.

Precondition:

- Caregiver has downloaded the app and navigated to registration.

Postconditions:

- Caregiver identity is verified through KYC.
- Caregiver has an account.
- Caregiver can interact with submitted care requests and communicate with
  customers through the app.

Registration steps:

1. Caregiver clicks registration.
2. System displays phone number authentication field.
3. Caregiver submits phone number.
4. System validates phone format.
5. System sends OTP by SMS.
6. Caregiver enters OTP.
7. System verifies OTP.
8. System redirects caregiver to `u-id.net` KYC.
9. KYC returns name, last name, national ID, and age/date of birth.
10. Caregiver reviews auto-filled information.
11. Caregiver uploads mandatory profile photo.
12. Caregiver confirms.
13. System prompts for password and repeated password.
14. Password must include uppercase, lowercase, number, one symbol from
    `@-!+*%$#`, and at least six characters.
15. System logs caregiver in, redirects to dashboard, and sends welcome
    notification.

---

## Care Giver Credentials Verification Flow

Use case: Care giver evaluation and badge assignment.

ID: `CG-202`.

Trigger:

- Caregiver clicks Evaluate Credentials.

Purpose:

- Register caregiver credentials.
- Send credentials to headquarters/admin for evaluation.
- Assign approved badges.
- Activate caregiver for care requests.

Flow:

1. Caregiver clicks Evaluate Credentials.
2. System displays caregiver information form and formatting guidelines.
3. Caregiver fills required fields.
4. System validates input.
5. System confirms successful submission.
6. System notifies caregiver that credentials are pending HQ evaluation.
7. Process pauses until HQ completes evaluation.
8. After HQ approval, system updates caregiver status to Verified.
9. System assigns Verified Caregiver badge based on credentials.
10. System notifies caregiver that evaluation is complete.
11. Caregiver accesses care request dashboard and can accept assignments.

Data destination:

- CG profile qualification.

---

## Care Giver Evaluation Form

### Personal Information

- Name.
- Last name.
- National identity number.
- Birth date.
- Address.

### Credentials And Licenses

Caregiver selects only services where they have formal training,
certification, or verifiable experience. Each expertise requires its own exam.

### Licensed Physician And Paramedic Expertise

- In-home medical assessment and care planning.
- Medication prescription and management.
- Advanced wound care and debridement.
- Emergency intervention and stabilization.

### Nursing Aide / CNA Expertise

- Diabetic care management.
- Ostomy and catheter care.
- Wound care assistance.
- Incontinence care.
- Vital signs monitoring.
- Ambulation and transfer support.
- Post-hospitalization care.

### Physical Therapist Assistant / Physiotherapist Expertise

- Prescribed exercise program guidance.
- Mobility and balance retraining.
- Therapeutic activities.
- Gait training.
- Pain management modalities.
- Range of motion exercises.

### Occupational Therapy Assistant Expertise

- Cognitive rehabilitation activities.

### Specialized Caregiver Expertise

- Dementia and Alzheimer's care.
- Parkinson's disease care.
- Hospice and end-of-life comfort care.
- Stroke recovery support.
- Visual or hearing impairment support.
- Behavioral health support for depression/anxiety.

### Companion And Homemaker Expertise

- Social and cognitive engagement.
- Meal planning and preparation for special diets.
- Medication reminders and organization.
- Transportation and community reintegration.
- Home organization and light housekeeping.
- Technology assistance for family/social connection.

### Psychiatric Nurse Expertise

- Mental status monitoring and assessment.
- Psychotropic medication management and education.
- Behavioral crisis de-escalation.
- Therapeutic communication and counseling.

### Mental Health Therapist Expertise

- Individual psychotherapy.
- Family counseling and caregiver support.
- CBT for seniors.
- End-of-life and grief counseling.

### Nutritionist / Dietitian Expertise

- Comprehensive nutritional assessment.
- Therapeutic diet management.
- Tube feeding management.
- Nutrition support for wound healing.

### Non-Emergency Medical Transport Driver Expertise

- Wheelchair/scooter secure transport.
- Ambulatory assistance and door-through-door service.
- Medical appointment logkeeping.

### Mobility Assistant Expertise

- Ergonomic home setup.
- Public mobility assistance and navigation.

### Document Upload

The system displays upload requirements based on selected qualifications.

License-number fields appear when caregiver selects:

- Licensed physician.
- Licensed nurse.
- Psychiatric nurse.
- Non-emergency medical transport driver.
- Other clinical/licensed medical professional categories.

Document categories include:

- Clinical and licensed medical professionals.
- Certified and allied health professionals.
- Specialized and support roles.
- Home caregiving services.

### Experience

Caregiver selects most relevant experiences in their field.

### References

Caregiver provides two references:

- Name and last name.
- Phone number.
- Optional address.

### Guidelines And Conduct

Caregiver must confirm:

- They have read privacy policy and code of conduct.
- They accept the privacy policy.
- They adhere to Hamdel code of conduct.

### Final Test

Caregiver reads a booklet and takes an exam. Progress can be saved as draft.

### Profile Completion

Caregiver creates public profile:

- Bio.
- Photo upload.
- Bank account linking.

---

## Admin Panel

The admin panel is the desktop control surface for operations, users, orders,
finance, compliance, support, marketing, CMS, reporting, and technical tools.

---

## Admin Roles And Access Levels

### Super Admin

Full unrestricted system access.

Capabilities:

- Manage all admins and roles.
- Full read/write/delete access to all modules.
- Override financial actions.
- Override caregiver assignments.
- Edit pricing, services, and configurations.
- Access system logs, backups, and audit trails.
- Approve or revoke any admin role permission.

### Operations Manager

Responsible for day-to-day service operations and booking/matching.

Capabilities:

- Manage all orders.
- Edit, reassign, cancel, and override orders.
- Manual match and broadcast match.
- Urgent match override.
- Replace caregiver.
- Edit order time, location, and service details.
- Access real-time caregiver tracking.
- Initiate push notifications.
- Reopen chats.
- View all chat logs read-only.
- Modify address details through correction tools.
- Edit patient profile with limitations.
- Edit medical info with compliance approval.
- Merge duplicate patient accounts.
- View timeline and assignment history.
- Add internal notes.

Restrictions:

- No financial approvals.
- No website content access.
- Limited medical data editing.

### Customer Support Admin

Handles user-facing issues, app problems, and complaints.

Capabilities:

- Access Support Hub.
- Access Financial and Accounting Management.
- Create and resolve tickets.
- Use canned responses.
- Resend invoices without approving refunds.
- Trigger OTP resend.
- Run push notification tests.
- Reset device token.
- View device logs.
- View order details read-only.
- Trigger broadcast match request with Ops approval.
- File complaints.
- View and reopen chats.
- Modify basic profile details such as phone, language, and family members.
- Use quick-call tools for caregiver/care receiver.
- Create medical inquiry ticket for Compliance team.
- Assign caregivers.

Restrictions:

- Cannot modify medical data.

### Accountant / Finance Admin

Responsible for financial operations.

Capabilities:

- Full access to Transactions module.
- Approve refunds.
- Edit pre-settlement transactions.
- Trigger auto-refund.
- Manage caregiver payouts.
- Reconcile payment gateway logs.
- Access financial reports.
- Export CSV/XLS/PDF.
- Resend invoices.
- Approve manual adjustments.
- Access revenue dashboards.

Restrictions:

- No sensitive patient data.
- Cannot modify orders.
- No technical tools.

### Website Admin / CMS Admin

Manages public website and Help Centre content.

Capabilities:

- Manage website pages.
- Manage FAQ categories and items.
- Publish and unpublish help articles.
- Manage SEO metadata.
- Manage banners and images.
- Handle marketing page content.
- Edit shared in-app FAQ content.

Restrictions:

- No operations or orders.
- No financial access.
- No patient or medical data.

### Marketing Admin

Manages marketing tools and user engagement.

Capabilities:

- Create promo codes.
- Manage discount rules.
- Create non-operational push campaigns.
- Manage in-app banners.
- Segment users for marketing campaigns.
- Access user engagement analytics.
- Manage referral program.
- Edit public service descriptions.

Restrictions:

- No operational action.
- No financial approvals.
- No medical data.

### Compliance And Safety Admin

Oversees medical regulations, documentation, and safety.

Capabilities:

- Review caregiver medical documents.
- Approve/reject caregiver verification.
- Manage triage rules.
- Manage allowed and restricted medical tasks.
- Moderate flagged chat messages.
- Access nurse reports.
- Review medical incident reports.
- Provide guidelines to support team.
- Edit medical profile fields with logs.

Restrictions:

- No financial systems.
- No website content.

### Technical Admin / System Admin

Responsible for infrastructure and system operations.

Capabilities:

- Access device logs.
- Access error logs.
- Reset device tokens.
- Manage push notification infrastructure.
- Access server health dashboard.
- Manage API keys.
- Trigger backups.
- Restore backups.
- Manage app version control.
- Manage system configurations.

Restrictions:

- No patient or medical data.
- No order management.
- No financial tools.

### Data Analyst

Read-only analytics and dashboard access.

Capabilities:

- View analytics panels.
- Export reports.
- View FAQ traffic.
- Analyze support ticket patterns.

Restrictions:

- Cannot modify data.
- No identity-sensitive medical information.

### Content Moderator

Handles user-generated content moderation.

Capabilities:

- Moderate caregiver reviews.
- Moderate complaints.
- Moderate flagged chat.
- Handle abuse reports.
- Flag caregiver/patient accounts for investigation.

Restrictions:

- No financial tools.
- No operational tools.

### Custom Admin

Custom role configuration is supported through access control.

---

## Admin Orders Management

Order management tracks and filters:

- Order number.
- Care receiver.
- Type of service.
- Location.
- Date and time.
- Interval.
- Rate and breakdown.
- Payment status.
- Caregiver.
- Chat access.
- Order status.
- CG live location.
- Notes.

Order actions include:

- Cancel order.
- Open CR profile.
- Edit order service, location, date/time, interval, and details.
- Issue refund request.
- Open CG profile.
- Change caregiver.
- Open CG-CR chat.
- Open CG chat.
- Open CR chat.

Order statuses include:

- Matched.
- Cancelled.
- On the way.
- In progress.
- Completed.

---

## Admin Caregiver Management

Caregiver management tracks:

- CG profile.
- Service abilities.
- Ratings and reviews.
- Location history.
- Real-time GPS.
- Recent location logs.
- Payouts and tips.
- Compliance flags.
- Orders.
- Chats.
- Notes.
- Verification status.
- Flagged activities.

Actions include:

- Search.
- Filter.
- Edit.
- Approve.
- Reject.
- Flag.
- Suspend account.
- Review identity info.
- Review documents.
- Review certificates.
- Review background check.

---

## Admin Care Receiver Management

Care receiver management tracks:

- Profile and documents.
- Booking history.
- In-progress bookings.
- History and chats.
- Reviews and complaints.
- Rate field.
- Wallet and payment history.
- Tipping history.
- Notes.
- Address book.
- Family members.
- Medical info.

Actions include search, filter, edit, and review related records.

---

## Support Operations Hub

Support tickets include:

- Ticket number.
- Date and time.
- Order number.
- Message.
- Priority.
- Assigned customer support officer.
- Ticket status.
- Escalate to supervisor.
- Notes.

Priority levels:

- High urgency.
- Medium.
- Low.

Ticket statuses:

- Submitted/new.
- In progress.
- Resolved.
- Waiting on customer.

Ticket categories are shared across all three apps:

- Disputes.
- Refund.
- Payments.
- Technical issues.
- Account management.
- General inquiry.
- Suggestions.
- Clinical and wellness issues.
- Security and compliance.

FAQ portals:

- FAQ Care Receiver: admin can enter CR FAQ content used in CR app.
- FAQ Care Giver: admin can enter CG FAQ content used in CG app.

---

## Financial And Accounting Management

Financial management tracks:

- Transaction number.
- Date and time.
- Order number.
- Transaction type.
- Transaction details.
- Transaction status.
- Assignment.
- Notes.

Finance views include:

- Revenue calculator and graph view.
- Caregiver payouts.
- Care receiver payments.
- Refunds.
- Invoice management.

Caregiver payout fields:

- Transaction number.
- Date and time.
- Order number.
- Order details.
- Caregiver.
- Transaction status.
- Cuts/dividend.
- Notes.

Care receiver payment fields:

- Transaction number.
- Date and time.
- Order number.
- Order details.
- Care receiver.
- Transaction status.
- Cuts/dividend.
- Notes.

Refund fields:

- Transaction number.
- Date and time.
- Order number.
- Order details.
- CG/CR.
- Transaction status.
- Cuts/dividend.
- Notes.

---

## CMS And Marketing Tools

CMS / marketing includes:

- Promo codes.
- Campaign creation.
- Push notifications.
- User segmentation.
- Referral program settings.
- Marketing banners.

Website requirements:

- Public website pages.
- Multilanguage support.
- Website admin panel.

---

## Compliance And Safety Module

Compliance tools include:

- Triage guidelines editor.
- Allowed vs restricted procedures.
- Medical incident logs.
- Flagged chat review.
- Document verification.
- Safety audit trail.
- Medical FAQs for internal staff.

---

## Technical Tools Module

Technical tools include:

- Device logs.
- Notification logs.
- OTP logs.
- Error logs.
- API key management.
- App version management.
- Backup triggers.
- System metrics dashboard.

---

## Reporting Module

Reports include:

- Financial reports.
- Operational performance.
- Caregiver success metrics.
- Cancellation reasons.
- Support ticket trends.
- FAQ performance.
- Device error trends.

---

## Shared System Tools

Shared tools across roles:

- Global search.
- Advanced filters.
- Export CSV/XLS.
- Audit log viewer.
- Access control manager.
- Internal notes system.
- Escalation centre.

---

## Tables And Dropdown Lists

Admins can edit, add, or remove dropdown values and table entries.

### Relationship Categories

- Parent.
- Children.
- Grandparent.
- Sibling.
- Extended family.
- Partner.
- Friend.

### Languages

- Persian/Farsi.
- Azerbaijani Turkish.
- Kurdish.
- Gilaki.
- Mazandarani.
- Luri.
- Arabic.
- Balochi.
- English.

### Health And Conditions

More than one option can be selected in each section.

Measurements:

- Weight.
- Height.

Mobility level:

- Independent.
- Needs assistive device.
- Needs partial assistance.
- Dependent.
- Immobile.

Level of consciousness:

- Alert and fully oriented.
- Confused by time/place.
- Semi-confused or slowed response.
- Unconscious/unresponsive.

Chronic condition categories:

- Cardiovascular: heart failure, hypertension, other.
- Respiratory: asthma, COPD, other.
- Neurological: Parkinson's, Alzheimer's, other.
- Metabolic: diabetes, osteoporosis, other.
- Musculoskeletal: arthritis, tendonitis, other.
- Fracture: no recent fracture, fracture under treatment, upper limb, lower
  limb, spinal, multiple, other.
- Incontinence: urinary, fecal.

Allergies and history:

- Drug allergy.
- Food allergy.
- Environmental allergy.
- Anaphylaxis.

Fears and boundaries:

- Fear of needles and injections.
- Fear of blood.
- Germaphobia.

Medication:

- Full list of current medications.

Psychological condition:

- Depression.
- Anxiety.
- PTSD.
- Panic attacks.
- Dementia.
- Mild cognitive impairment.
- Sundowning or confusion after evening.
- Apathy or lack of motivation.
- Social withdrawal or loneliness.
- Insomnia.

### Sex Preferences

- Male only.
- Female only.
- Both male and female.
- Male preferred but not mandatory.
- Female preferred but not mandatory.

### Other Preferences

- Diaper change: yes/no.
- Enjoys chatting and socializing during visits.
- Prefers quiet environment and limited conversation.
- Wants caregiver to speak directly to patient, not family members.
- Preferred name.

### CR Badges

- Patient.
- Cooperative.
- Communicative.
- Respectful.
- Well-aware of the scope.

---

## Services And Rates

All services must have editable rates. Rates can use multiple currencies.

### Mobility Help

- Companionship outside.

### Basic Care

- Cooking.
- Socializing.
- Cleaning and arranging the house.
- Walk to the bathroom.
- Medication reminders.
- Help putting on clothes.

### Basic Plus

- All Basic services.
- Personal hygiene assistance.
- Nail clipping.
- Shaving.
- Teeth brushing.
- Flossing.
- Mouth wash.
- Showering.
- Mouth feeding.
- Medical care selections.
- Vital sign monitoring.
- Wound dressing change.
- Board certified therapy sessions.
- Advanced wound care.
- Catheter care.
- Drain change.
- Tube feeding.

### Medical Care

- Injections.
- Vital sign monitoring.
- Wound dressing change.
- Board certified therapy sessions.
- Advanced wound care.
- Catheter care.
- Drain change.
- Tube feeding.

### Special Care

- Post-operative care.
- Alzheimer care.
- Stroke recovery care.
- Cardiac event recovery care.
- Cancer treatment/recovery care.
- Palliative care.
- Ventilator/tracheostomy care.
- Hospice/end-of-life care.
- Respite care.

### Extra Packages

- Beauty services: haircut, makeup, skin care.
- Massage therapy.
- Wellness check by call or at home.
- At-home blood draw services.
- Physiotherapy.
- Nutrition planning.

---

## Database Entities Mentioned In SRS

The SRS explicitly identifies the following database/table areas:

- `faq_categories`.
- `faq_items`.
- `faq_views`.
- `internal_notes`.
- `device_logs`.
- `address_corrections`.
- `support_ticket_categories`.
- `refund_requests`.
- `medical_task_rules`.
- `match_broadcast_logs`.
- `notification_logs`.
- `chat_audit_logs`.
- Care giver applicant information.

Additional implied data models:

- CR profile.
- CG profile.
- Recipient list.
- Address book.
- Booking history.
- Wallet.
- Payment transactions.
- Invoices.
- Payouts.
- Refunds.
- Support tickets.
- Admin roles.
- Access permissions.
- Reviews.
- Complaints.
- Favorite caregivers.
- Safety contacts.
- Medical information.
- Service packages.
- Dropdown/reference data.
- Audit logs.
- KYC records.
- OTP logs.

---

## Admin Credentials Evaluation Flow

Use case: Admin credentials evaluation.

ID: `AD-301`.

Trigger:

- Admin receives a caregiver application.

Purpose:

- Admin grants caregiver service permission.
- Admin assigns badge to caregiver.
- Verified caregiver can accept/send care requests, receive money, and use chat
  with linked customers.

Precondition:

- Caregiver submitted the credential evaluation form.
- Admin received the form as an application.

Admin review includes:

- Reviewing caregiver details.
- Reviewing test score.
- Contacting references.
- Verifying uploaded documents.
- Conducting legal background check.
- Validating each topic.

System behavior:

- Displays new application for review.
- Calculates caregiver skills based on clearance topics.
- Assigns recommended badge to caregiver profile.
- Waits for admin approval.
- On approval or badge change, grants caregiver permissions.

Data destinations:

- Caregiver applicant information.
- Database records under admin/compliance tables.

---

## Cross-Platform Notes From Meetings

- Repetitive fields should be categorized as tables or dropdowns.
- Save and close-window logic should be uniform.
- Shared tables should be used across CR, CG, and admin instead of duplicating
  the same service/dropdown data.
- A caregiver profile owner may also request care for a loved one, such as their
  father. In that case, marketplace listing is created from the user's account
  but reviews shown should belong to the loved one receiving care.
- Data retention and extension rules need to be decided.
- Open questions include how CRs like/favorite CGs, how favorite caregivers are
  connected to the correct recipient, and matching-method flow details.

---

## Full-Stack Engineering Interpretation

Hamdel is a full-stack project because it requires:

- Multi-role frontend applications for CR, CG, and Admin.
- Authentication, OTP, KYC, profile completion, and role switching.
- Complex relational data modeling for people, recipients, addresses, bookings,
  services, payments, tickets, reviews, chats, and admin permissions.
- Backend APIs for booking, matching, wallet/escrow, payments, documents,
  credentials, chat, support, finance, reporting, and CMS.
- Role-based access control for sensitive operations and data.
- Operational dashboards with filtering, search, audit logs, exports, and
  internal notes.
- Integration points for KYC, SMS/OTP, payment APIs, map APIs, notification
  systems, and potentially electronic health record systems.
- Compliance-aware handling of medical information, safety plans, documents,
  incident reports, and chat moderation.

---

## Recruiter-Relevant Value

Hamdel demonstrates:

- Large SRS analysis.
- Product decomposition into user roles and modules.
- Full-stack architecture planning.
- Healthcare/caregiving workflow understanding.
- Role-based admin and access-control design.
- Data classification and database modeling.
- Operational, financial, compliance, support, and CMS workflow design.
- Complex form and dropdown modeling.
- Booking, matching, payment, chat, support, and reporting workflows.
- Ability to translate vague requirements into structured implementation-ready
  product knowledge.

## Reuse Rules

When using this knowledge base in a chatbot, portfolio, or public README:

- Keep authentication descriptions high level.
- Keep deployment descriptions high level.
- Keep infrastructure descriptions generic.
- Do not add private project configuration.
- Do not add private operational notes.
