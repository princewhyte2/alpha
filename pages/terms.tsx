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
          TERMS AND CONDITIONS
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
                ACCEPTANCE OF TERMS OF USE
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                1.1. These Terms and Conditions (referred to as “T &C”) govern any user of this website, mobile site,
                and/or Mobile Application (altogether, the “Services”) that: a. has placed a job request on any of our
                Services component; b. has placed a job application on any of our Services components; c. has submitted
                application in respect of the job advertised by us; and d. has utilized any features of the Services
                offered by us. 1.2. Your access to and use of the information, materials and contents provided on the
                Services is conditional upon your acceptance and compliance with the T&C. 1.3. Depending on what level
                of Services you require, there may be other terms that govern your relationship with us in conjunction
                with these T&C 1.4. The Services and all associated property and right is owned and operated by MYTO
                LIMITED, a company duly registered under the law of the Federal Republic of Nigeria. 1.5. Your continued
                use of any component of our Services will be deemed as acceptance of these T&C by you.
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
                VARIATION OF TERMS
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                2.1. We may vary these T&C at any time by publication on any of the components of our Services. 2.2. You
                accept that by using the website after the publication of any variation(s) under these T&C, we have
                provided you with sufficient notice of the variation to the T&C.
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
                INTELLECTUAL PROPERTY RIGHTS
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                MYTO LIMITED retains and exercises all intellectual property rights subsisting in any service and
                content provided to you on the Services
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
                LIMITATION OF LIABILITY AND DISCLAIMER
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                4.1. We maintain all components of the Services to provide information about the customer or employer.
                The materials on the Services are for the purpose of information and do not constitute any contractual
                relationship between MYTO LIMITED and the persons accessing or receiving information through the
                Services. 4.2. In the course of carrying out its business of recruitment, selection, onboarding of
                artisans, and management of employees for its users and clients across different sectors of the Nigerian
                economy, we advertises job vacancies through our Services, print, electronic, and social media directly
                without using agents or third parties. 4.3. We shall not at any time and under any circumstances require
                prospective artisan to make any payment to undergo its recruitment and selection processes. 4.4. We will
                not be responsible or answerable to any artisan who directly or indirectly makes any payment through
                cash, cheque lodgment or bank transfers to anybody or any third party purportedly on our behalf. 4.5. We
                do not warrant the accuracy, completeness, quality, adequacy or content of any information on the
                Services. Such information is provided “as is” without warranty or condition of any kind, either
                expressed or implied. 4.6. We will not be responsible or liable for any direct, indirect, special,
                incidental, or consequential damage, or any other damages whatsoever, including, without limitation,
                lost revenues, lost profits or loss of prospective economic advantage, resulting from the use of or
                misuse of or inability to access or use this Services. 4.7. We accept no responsibility or liability for
                any errors in your advertisements and you must check your advertisements for errors as soon as they are
                placed on the Services. 4.8. We agree to use reasonable efforts to publish advertisements in the
                shortest possible time. 4.9. We cannot and do not guarantee you that files available for downloading
                through the Services or delivered via electronic mail will be free of infection or viruses, worms,
                Trojan horses or other code that manifest contaminating or destructive properties. You are responsible
                for implementing sufficient safety procedures and checkpoints to satisfy your particular requirements
                for accuracy of data input and output, and for maintaining a means external to the Services for the
                reconstruction of any lost data. 4.10. We act only as a medium through which artisans seek employment
                opportunities or jobs. We do not vet, nor are we responsible for vetting artisans or the representations
                made by them whether oral or in writing - including those representations appearing on artisans'
                resumes. 4.11. We provide no warranty to you that the Services will be uninterrupted or error free.
                Except where we are unable to exclude our liability by legislation, we, our officers, employees, agents,
                and contractors will not be liable in any way to you or anyone else for any loss or damage, however it
                arises (whether in contract, negligence, or otherwise) out of or in connection with your access and use
                of the Services. 4.12. Liability for breach of any express or implied term which cannot be excluded by
                legislation is limited at our option only to either, the supply of the type of services or published
                contents. 4.13. Our limitation of liability under these T&C applies to direct, indirect, consequential,
                special, punitive or other damages that you or others may suffer, as well as damages for loss of profit,
                business interruption or the loss of data or information, even if we are informed of their possibility.
                4.14. We act only as a medium through which artisans seek employment opportunities or jobs. We do not
                guarantee user or customer or employer that information supplied will impose an obligation on us to
                provide the job with respect to the terms of use. 4.15. We reserve the right at all times, without the
                need to have to provide any notice to you, to alter the functionality and/or appearance of our Services,
                including but not limited to advertisements.
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
                User’s Obligations
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                5.1. You warrant and agree that: a. you have the legal capacity and power to agree to be bound by these
                T&Cs and perform the obligations under them; b. advertisements and other jobs posted do not breach the
                intellectual property rights of any third party; c. all files delivered to us will be free of infection
                or viruses; d. you will not use the Services for any illegal purpose; e. you will not use the Services
                or any of its features or products offered to upload, download, transact, store or make available data
                that is unlawful, harassing threatening, harmful, tortious, defamatory, libelous, abusive violent,
                obscene, invasive of another's privacy, racially or ethnically offensive or otherwise in our opinion
                objectionable or damaging to us, our users or persons generally; f. if you have engaged a third party
                provider to obtain data and/or obtain Services from us on your behalf, you understand that a breach of
                these T&C by that provider will be deemed to be a breach of the relevant T&C by you, and we will have
                the right to take action against you on account of that breach (even if you had no knowledge of, and no
                involvement in, the said breach); and 5.2. You shall not assign or transfer any rights and obligations
                pursuant to these T&C to any other person or entity without our prior written approval (which will not
                be unreasonably withheld). If you are a legal person, any change in your effective control shall be
                deemed an assignment for the purpose of this clause. 5.3. You indemnify and will keep us indemnified,
                our officers, employees and agents against all claims, actions, suits, liabilities, actual or contingent
                costs, damages and expenses incurred by us in connection with: a. any breach of these T&C by you; b. any
                negligent act or omission by you; c. an actual or alleged breach by you of any law, legislation,
                regulations, bylaws, ordinances or codes of conduct which occurs as consequence of the your use of the
                Services. 5.4. You agree at all times to deal with any information or contents provided by us or
                accessed from the Service in a manner which abides by all applicable laws of Nigeria, or of any other
                relevant jurisdiction (including, without limitation, privacy and copyright laws). 5.5. Except as
                otherwise permitted under these T&C, you shall not modify, copy, reproduce, republish, upload, post,
                transmit or distribute in any way any material from the Services including code and software. 5.6. You
                shall not use data mining, robots, screen scraping, or similar automated data gathering, extraction or
                publication tools on the Services (including without limitation for the purposes of establishing,
                maintaining, advancing or reproducing information contained on our website on another website or in any
                other publication), without our prior written approval.
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
                AUTHORITY TO EXPLOIT AND USE OF DATA/ ACCESS
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                6.1. By using the Services, you expressly authorise us to store, retain and use all information, data,
                subjects requests and applications submitted in response to the relevant advertisement and contents.
                6.2. Your access to the Services (and the functionality contained therein) will be via a secure login
                username and password issued to you by us (the “Password”). And you shall be responsible for: a.
                providing us with your true and accurate information pertaining to your identity and any other related
                subject or information as may be required on the Services; and b. ensuring that any Password provided to
                authorised users is kept secured and confidential. 6.3. You are responsible for the use of the Password
                issued by us to enable users to gain access to the Services, whether the use is by authorised users or
                any other person. Any act or omission by an authorised user in respect of the use of the Password and/or
                the use of the Services that breaches these Terms will be deemed a breach of these T&C by you
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
                MAINTENANCE
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 450,
                  color: "#475467",
                }}
              >
                We will use reasonable endeavours to ensure that the Services is available for access by authorised
                users at all times. Notwithstanding this, we and our third-party service providers may be required to
                undertake maintenance and upkeep of the Services from time to time. We will endeavour to limit any
                'downtime' period.
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
