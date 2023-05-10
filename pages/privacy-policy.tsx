import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { ReactElement, useState, useCallback, useRef } from "react"
import NavLayout from "../components/layouts/nav"

function Page() {
  return (
    <Box sx={{ flexGrow: 1, background: "#FFFFFF" }}>
      <Container maxWidth="xl">
        <Typography
          textAlign={"center"}
          sx={{ textDecoration: "underline", m: 0, fontSize: { xs: 16, md: 20 }, fontWeight: 450, color: "#475467" }}
        >
          PRIVACY POLICY
        </Typography>
        <Box>
          <ol>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                ABOUT THIS POLICY
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                This is the Privacy Policy (the “Policy”) for the website hosted at{" "}
                <a href="https://www.workfynder.com/">https://www.workfynder.com/</a> which is operated by and on behalf
                of MYTO LIMITED as well as for the use of its Mobile Application known as Workfynder. This Policy
                describes your privacy rights regarding Workfynder’s collection, use, storage, sharing and protection of
                your personal information. It applies to our website and all related sites, applications, services and
                tools regardless of how you access or use them. This Policy will help you understand how we use your
                information and what we do with it. We respect the privacy of our online visitors and registered users
                as such we will take reasonable steps to protect your information. This Policy also describes how we
                collect information about you, what we do with that information, and also what controls you have over
                that information in relation to your use of our services, website and Mobile Application. By visiting
                and using our website, mobile site, and/or Mobile Application (altogether, the “Services”), you
                acknowledge you have read and understood this Policy.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                HOW WE COLLECT YOUR INFORMATION
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                When using the Services provided by Workfynder, we may collect and process the following information
                about you:
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                a.Information provided directly by you:
                <br /> i. information (such as your name, business/company name, email address, contact address,
                telephone number and other contact details that you provide by completing forms when using the Services,
                including information about you if you register as a user or subscribe to a Services, information about
                you that you upload or submit, or information you provide to us when requesting information or material
                from us; ii. information and other details of any transactions made by you including but not limited to
                name, address and other financial-related information (“Billing Information”) provided by you when
                making transactions by use of the Services; iii. information contained in communications you send to us,
                for example to report a problem or to submit queries, concerns or comments regarding the Services
                generally; iv. information from surveys that we may, from time to time, conduct on the Services that you
                respond to or participate in; v. information on your skills, business and its operations from any
                materials you send us, that we use in creating personalized course content for customers or employers;
                and vi. other additional information that you provide to us when attending our programs.
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                b. Information that we may collect from you when you use our Services
                <br /> We may automatically collect certain information about the devices that you use to access the
                Services, including mobile devices and computers, through commonly-used information-gathering tools,
                such as cookies and web beacons. We may also collect information when you access the Services such as:
                (i) location information, unique device identifiers and other information about your mobile phone or
                other mobile device(s) such as your Internet Protocol (“IP”) address, browser types, browser language,
                operating system, the state or country from which you accessed the Services; and (ii) information
                related to the ways in which you interact with the Services, such as referring and exit pages and URLs,
                platform type, the number of clicks, domain names, landing pages, pages viewed and the order of those
                pages, the amount of time spent on particular pages, the date and time you used the Services, error
                logs, and other similar information. If you do not want to provide us with location-tracking
                information, you can disable the GPS or other location-tracking functions on your device; provided your
                device allows you to do this. We may aggregate and/or de-identify information collected by the use of
                the Services so that the information is not intended to identify you. This Policy does not restrict our
                use or disclosure of aggregated and/or deidentified information
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                c. Information about you collected from third parties
                <br /> When using the Services provided by Workfynder, we may collect and process the following
                information about you: i. from your customer or employer in connection with your engagements, contract,
                job and how it relates to us; ii. if you use any of the component which constitute the Services operated
                by us; iii. from third parties we work closely with (including, for example, business partners,
                sub-contractors in technical, payment and delivery services, advertising networks, analytics providers,
                and search information providers). We will notify you when we receive information about you from them
                and the purposes for which we intend to use that information; and iv. if you access the Services through
                a third-party connection or log-in, you authorize us to collect, store, and use, in accordance with this
                Policy, any and all information available to us through the third-party interface.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                HOW WE USE YOUR INFORMATION:
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                Information is collected for the purposes stated in this Policy and will not be further processed in a
                manner that is incompatible with those purposes. We collect and use your information for the following
                purposes:
                <br />
                i. To perform the Services requested by you. For example, we will use the information provided to
                contact you about your interest in the Services. This data processing is necessary to provide or fulfill
                a service requested by or for you. ii. To plan and host programs. For example, corporate events, host
                online forums, blogs and social networks in which event attendees may participate, and populate online
                profiles in relation to the Services. This data processing is necessary to provide or fulfill a service
                requested by or for you. iii. For marketing purposes. For example, we may use your information to
                further discuss your interest in the Services and to send you information regarding Workfynder and our
                partners such as information about promotions, events, products or services. We will only send you
                marketing communications and updates about our products, services and events with your prior consent,
                where required by law or otherwise in our legitimate interests provided these interests do not override
                your right to object to such communications. You can withdraw your consent at any time. You can object
                to further marketing at any time by checking and updating your contact details within your account,
                or/and selecting the “unsubscribe”” link located on the bottom of Workfynder’s marketing emails. You
                have the right to contact us at any time to object to the further processing of your information for the
                purposes of direct marketing to you, including any profiling related to such marketing. iv. For
                financial and payment purposes. For example, for checking financial qualifications and collect payment
                from you, where applicable. This data processing is necessary to provide or fulfill a service requested
                by or for you. v. For operating and improving Workfynder’s Services and your customer or employer
                experience. For example, we may collect and analyze data on your use of our Services and process it for
                the purpose of improving our online customer experience. Data collected could include data about your
                device, such as unique device identifiers, information about your mobile phone or other mobile
                device(s), browser types, browser language, operating system, and the state or country from which you
                accessed the Services. Data collected could also include information related to the ways in which you
                interact with the Services, such as referring and exit pages and URLs, platform type, the number of
                clicks and domain names. This data allows us to understand our users, their interaction with our
                Services and improve our Services to better serve our users. We may use third-party analytics providers
                and technologies, including cookies and similar tools, to assist in collecting this information. Data
                processing for analytical and operational improvement purposes is a legitimate business interest. vi.
                For security purposes. For example, we may use your data to protect Workfynder and its third parties
                against security breaches and to prevent fraud and violation of Workfynder’s applicable agreements. Data
                processing for security purposes is a legitimate business interest. vii. For hosting purposes. For
                example, if you are our user, we may collect and host your data to provide Services to you. If your
                customer or employer is our user, we may process your data in accordance with providing Services to
                them. However, we will not review, share, distribute, or reference any such data except as provided in a
                services agreement between us and our users, or as may be required by law. Data processing for the
                purpose of hosting our Services is a legitimate business interest. viii. For customizing the Services
                with location-based information, advertising, and features. This data processing is necessary to provide
                or fulfill a service requested by or for you, and can be disabled by you. ix. Protection of Workfynder
                and Others. For example, we may disclose your information to: (i) comply with legal obligations; (ii)
                enforce any agreements that you entered into with us; (iii) respond to claims that any content violates
                the rights of third parties; (iv) respond to your requests for customer or employer service; and/or (v)
                the extent necessary for the purposes of the legitimate interests pursued by us or by the third party or
                parties to whom the data are disclosed, except where such interests are overridden by the interests for
                fundamental rights and freedoms of the data subjects. We may also disclose information to law
                enforcement agencies in emergency circumstances, where the disclosure of such information is consistent
                with the types of emergency disclosures permitted or required by law. This is data processing for
                compliance with a legal obligation. x. Business Transfers. For example, we reserve the right to disclose
                and transfer all of your information, to a successor (or potential successor) company in connection with
                a merger, acquisition, or sale of all, or component of our business, or in connection with due diligence
                associated with any such transaction. Data processing for this purpose is a legitimate business
                interest.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                COOKIES
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                Our Services uses cookies and/or other similar technologies to enhance & customize your user experience.
                Cookies are small text files placed on your device that enable us to remember your device, and which can
                be used to manage a range of features and content as well as storing searches and presenting
                personalized content. We use this information to ensure the proper functioning and security of our
                Services and to optimize Services. Cookies allow our servers to remember your account log-in information
                when you visit our website, IP addresses, date and time of visits, monitor web traffic and prevent
                fraudulent activities. If your browser or browser add-on permits, you have the choice to disable cookies
                for the Services; however this may limit your ability to use our Services.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                SECURITY
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                We have appropriate physical, electronic, and managerial procedures to safeguard and help prevent
                unauthorized access and maintain data security of, and to use correctly, the information we collect
                online. These safeguards vary based on the sensitivity of the information that we collect and store. All
                information you provide to us is stored on our secure servers. Where we have given you (or where you
                have chosen) a password which enables you to access certain parts of our Services, you are responsible
                for keeping this password confidential. We ask you not to share a password with anyone. Unfortunately,
                the transmission of information via the internet is not completely secure. Although we will do our best
                to protect your personal information, we cannot guarantee the security of your data transmitted to any
                component of our Services; any transmission is at your own risk. Once we have received your information,
                we will use strict procedures and security features to try to prevent unauthorized access. ) By using
                the Services or providing personal information to us, you agree that we can communicate with you
                electronically regarding security, privacy, and administrative issues relating to your use of the
                Services. If you have any reason to believe that your interactions with the Services are no longer
                secure, please notify us immediately at workfynder@gmail.com
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                HOW LONG WE KEEP INFORMATION:
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                How long we keep the information we collect about you depends on the type of information, as described
                in further detail below. After such time, we will either delete or anonymize your information or, if
                this is not possible (for example, because the information has been stored in backup archives), then we
                will securely store your information and isolate it from any further use until deletion is possible.
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                a. Account information: We retain your account information for as long as your account is active and a
                reasonable period thereafter in case you decide to reactivate the Services. We also retain some of your
                information as necessary to comply with our legal obligations, to resolve disputes, to enforce our
                agreements, to support business operations, and to continue to develop and improve our Services. Where
                we retain information for service improvement and development, we take steps to eliminate information
                that directly identifies you, and we only use the information to uncover collective insights about the
                use of our Services, not to specifically analyze personal characteristics about you. b. Information you
                share on the Services: If your account is deactivated or disabled, some of your information and the
                content you have provided will remain in order to allow your team members or other users to make full
                use of the Services. c. Managed accounts: If the Services are made available to you through an
                organization (e.g., your customer or employer), we retain your information as long as required by the
                administrator of your account. d. Marketing information: If you have elected to receive marketing emails
                from us, we retain information about your marketing preferences for a reasonable period of time from the
                date you last expressed interest in our Services, such as when you last opened an email from us. We
                retain information derived from cookies and other tracking technologies for a reasonable period of time
                from the date such information was created.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                CHANGES TO THIS POLICY
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                Workfynder, at its sole discretion reserves the right to change this Policy from time to time. Please
                check this page periodically for changes. If we make any material changes to this Policy, we will notify
                you before they take effect. Any such material changes will only apply to personal information collected
                after the revised Policy took effect.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                NO RIGHTS OF THIRD PARTIES
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                This Policy does not create rights enforceable by third parties or require disclosure of any personal
                information relating to users of the Services.
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                EXERCISING YOUR RIGHTS:
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                You may submit a request for access (i.e. request information on personal data collected, used,
                disclosed or processed by Workfynder), as well as a request for integration, rectification, or erasure,
                or object to our processing of your personal data. Upon request, Workfynder will provide you with
                information about whether we hold any of your personal information. Furthermore, you may also be able to
                exercise the following rights to restrict processing, data portability, and lodge a complaint with a
                data protection authority. In particular, you have the right to object and withdraw your consent, in
                whole or in part, to the collection, use, disclosure or processing of your personal data for purposes of
                dispatch of advertising material, direct selling or for the fulfillment of marketing surveys or
                commercial communication (e-mail). If you prefer that the processing of your personal data is carried
                out solely by means of traditional contact methods, you may object to the processing of your personal
                data by means of automated contact methods. In order to exercise your rights above and/or submit
                inquiries or complaints with regard to our processing of your personal data, you may send a request to
                Workfynder by writing to this email address workfynder@gmail.com
              </Typography>
            </li>
            <li>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                CONTACT US
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                If you have questions or concerns regarding this Policy or if you would like to exercise your rights
                described in this Policy you may contact us at: workfynder@gmail.com
              </Typography>
            </li>
          </ol>
        </Box>
      </Container>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

export default Page
