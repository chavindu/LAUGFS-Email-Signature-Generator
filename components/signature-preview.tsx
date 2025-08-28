import React, { useRef, useState, useEffect } from "react"

interface SignaturePreviewProps {
  data: {
    firstName: string
    lastName: string
    fullName: string
    designation: string
    department: string
    mobile: string
    direct: string
    extension: string
    address: string
    logoBase64: string
    selectedLogo: string
    secondLogoBase64?: string
  }
  htmlContent?: string
}

const companyDomains: { [key: string]: { display: string; url: string } } = {
  lubricants: { display: "www.laugfslubricants.com", url: "https://www.laugfslubricants.com" },
  international: { display: "www.laugfsinternational.lk", url: "https://www.laugfsinternational.lk" },
  holdings: { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
  gas: { display: "www.laugfsgas.lk", url: "https://www.laugfsgas.lk" },
  engineering: { display: "www.laugfsengineering.lk", url: "https://www.laugfsengineering.lk" },
  "eco-sri": { display: "www.ecosri.lk", url: "https://www.ecosri.lk" },
  rubber: { display: "www.laugfsrubber.com", url: "https://www.laugfsrubber.com" },
  petroleum: { display: "laugfspetroleum.lk", url: "http://laugfspetroleum.lk" },
  power: { display: "laugfspower.lk", url: "https://laugfspower.lk" },
  "life-sciences": { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
  restaurants: { display: "www.jade.lk", url: "https://www.jade.lk" },
  "salt-chemicals": { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
  custom: { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
}

export function SignaturePreview({ data, htmlContent }: SignaturePreviewProps) {
  // Company logo configuration - matches main page
  const COMPANY_LOGO_CONFIG = {
    "anantaya-chilaw": { width: 144, height: 90 },
    "anantaya-passikudah": { width: 144, height: 90 },
    "business-solutions": { width: 180, height: "auto" },
    "eco-sri": { width: 180, height: "auto" },
    engineering: { width: 180, height: "auto" },
    "europe-bv": { width: 180, height: "auto" },
    gas: { width: 180, height: "auto" },
    holdings: { width: 180, height: "auto" },
    international: { width: 180, height: "auto" },
    leisure: { width: 180, height: "auto" },
    "life-sciences": { width: 180, height: "auto" },
    lubricants: { width: 180, height: "auto" },
    "lubricants-bangladesh": { width: 180, height: "auto" },
    maritime: { width: 180, height: "auto" },
    petroleum: { width: 180, height: "auto" },
    power: { width: 180, height: "auto" },
    property: { width: 180, height: "auto" },
    restaurants: { width: 180, height: "auto" },
    rubber: { width: 180, height: "auto" },
    "salt-chemicals": { width: 180, height: "auto" },
    slogal: { width: 180, height: "auto" },
    "southern-petroleum": { width: 180, height: "auto" },
    super: { width: 180, height: "auto" },
    terminals: { width: 180, height: "auto" },
    "usa-llc": { width: 180, height: "auto" },
    custom: { width: 180, height: "auto" },
  }

  // If full HTML is provided, render it directly to ensure perfect parity with exported/copied HTML
  if (htmlContent) {
    return (
      <div className="border rounded-lg p-4 bg-white overflow-auto">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    )
  }
  const [nameWidth, setNameWidth] = useState(0)
  const [contactMinWidth, setContactMinWidth] = useState(0)
  const nameRef = useRef<HTMLParagraphElement>(null)

  const showContactInfo = data.extension.length === 4
  const domain = companyDomains[data.selectedLogo] || companyDomains["holdings"]
  
  // Get current company logo configuration
  const currentLogoConfig = COMPANY_LOGO_CONFIG[data.selectedLogo as keyof typeof COMPANY_LOGO_CONFIG] || COMPANY_LOGO_CONFIG.holdings
  
  // Define text variables for rendering
  const addressText = data.address
  const mobileText = data.extension.length === 4 ? `Mobile: ${data.mobile} | Tel: +94 11 55 66 222` : `Mobile: ${data.mobile}`
  const telText = data.extension.length === 4 ? "" : "Tel: +94 11 55 66 222"
  const directText = `Direct: ${data.direct} | Ext: ${data.extension}`

  useEffect(() => {
    if (nameRef.current) {
      // Measure the width of the name text
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Measure bold text for name
        ctx.font = 'bold 10px Calibri, sans-serif'
        const nameWidth = ctx.measureText(data.fullName).width
        
        // Measure regular text for designation and department
        ctx.font = '10px Calibri, sans-serif'
        const designationWidth = ctx.measureText(data.designation).width
        const departmentWidth = ctx.measureText(data.department).width
        
        // Use the maximum width only; padding will handle left/right spacing
        const maxWidth = Math.max(nameWidth, designationWidth, departmentWidth)
        setNameWidth(maxWidth)
      }
    }

    // Compute contact column min width
    const measure = (t: string) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return 0
      ctx.font = '10px Calibri, sans-serif'
      return ctx.measureText(t).width
    }
    const contactWidth = Math.max(measure(addressText), measure(mobileText), showContactInfo ? measure(directText) : 0)
    setContactMinWidth(contactWidth)
  }, [data.fullName, data.designation, data.department, addressText, mobileText, directText, showContactInfo])

  return (
    <div className="border rounded-lg p-4 bg-white overflow-auto">
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          maxWidth: "894px",
          fontFamily: "Calibri, sans-serif",
          fontSize: "10px",
          margin: "0 auto",
          border: "none",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                width: `${currentLogoConfig.width}px`,
                minWidth: `${currentLogoConfig.width}px`,
                borderRight: "1pt solid black",
                borderTop: "0",
                borderBottom: "0",
                borderLeft: "0",
                padding: "0px 20px 0px 0px",
                verticalAlign: "middle",
              }}
            >
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  lineHeight: "115%",
                  textAlign: "center",
                }}
              >
                <img
                  src={data.logoBase64 || "/images/LAUGFS Holdings.png"}
                  alt="Company Logo"
                  style={{ display: "block", width: `${currentLogoConfig.width}px`, height: currentLogoConfig.height, objectFit: "contain", marginLeft: "auto", marginRight: "auto" }}
                />
              </p>
            </td>
            {data.secondLogoBase64 && (
              <td
                style={{
                  width: "177px",
                  minWidth: "177px",
                  maxWidth: "177px",
                  borderRight: "1pt solid black",
                  borderTop: "0",
                  borderBottom: "0",
                  borderLeft: "0",
                  padding: "0px 20px 0px 20px",
                  verticalAlign: "top",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px 0",
                    padding: "0",
                    lineHeight: "115%",
                    fontSize: "10pt",
                    textAlign: "left",
                  }}
                >
                  <img
                    src={data.secondLogoBase64}
                    alt="Anniversary Logo"
                    style={{ display: "block", width: "auto", height: "90px", objectFit: "contain", margin: "0", padding: "0" }}
                  />
                </p>
              </td>
            )}
            <td
              style={{
                width: "auto",
                minWidth: nameWidth ? `${nameWidth}px` : "auto",
                borderRight: "1pt solid black",
                borderTop: "0",
                borderBottom: "0",
                borderLeft: "0",
                padding: "0px 20px 0px 20px",
                verticalAlign: "top",
              }}
            >
              <p
                ref={nameRef}
                style={{
                  marginTop: "12.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
                  fontSize: "11pt",
                  whiteSpace: "nowrap",
                }}
              >
                <strong>{data.fullName}</strong>
              </p>
              <p
                style={{
                  marginTop: "4.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
                  fontSize: "10pt",
                  whiteSpace: "nowrap",
                }}
              >
                {data.designation}
              </p>
              <p
                style={{
                  marginTop: "4.0pt",
                  marginBottom: "8.0pt",
                  lineHeight: "1.0",
                  fontSize: "10pt",
                  whiteSpace: "nowrap",
                }}
              >
                {data.department}
              </p>
            </td>
            <td
              style={{
                width: "auto",
                minWidth: `${contactMinWidth}px`,
                borderTop: "0",
                borderBottom: "0",
                borderLeft: "0",
                borderRight: "0",
                padding: "0px 0px 0px 20px",
                verticalAlign: "top",
              }}
            >
              <p
                style={{
                  marginTop: "12.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
                  fontSize: "10pt",
                  whiteSpace: "nowrap",
                }}
              >
                {addressText}
              </p>
              <p
                style={{
                  marginTop: "4.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
                  fontSize: "10pt",
                  whiteSpace: "nowrap",
                }}
              >
                {mobileText}
              </p>
              {data.extension.length !== 4 && (
                <p
                  style={{
                    marginTop: "4.0pt",
                    marginBottom: "4.0pt",
                    lineHeight: "1.0",
                    fontSize: "10pt",
                    whiteSpace: "nowrap",
                  }}
                >
                  {telText}
                </p>
              )}
              {showContactInfo && (
                <p
                  style={{
                    marginTop: "4.0pt",
                    marginBottom: "8.0pt",
                    lineHeight: "1.0",
                    fontSize: "10pt",
                    whiteSpace: "nowrap",
                  }}
                >
                  {directText}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={data.secondLogoBase64 ? 4 : 3}
              style={{
                width: "100%",
                background: "#FFC000",
                border: "0",
                padding: "0in 0in 0in 0.2in",
              }}
            >
              <p
                style={{
                  margin: "0",
                  lineHeight: "115%",
                  fontSize: "10pt",
                }}
              >
                <span style={{ color: "#467886" }}>
                  <a
                    href={domain.url}
                    target="_blank"
                    style={{ color: "#467886", fontWeight: "bold", textDecoration: "underline" }}
                    rel="noreferrer"
                  >
                    {domain.display}
                  </a>
                </span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
