import React, { useRef, useState, useEffect } from "react"
import { COMPANY_LOGO_CONFIG, COMPANY_DOMAINS, getLogoConfig, getCompanyDomain } from "@/lib/logo-config"

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

export function SignaturePreview({ data, htmlContent }: SignaturePreviewProps) {

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
  const [secondLogoComputedWidth, setSecondLogoComputedWidth] = useState<number | null>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)

  const showContactInfo = data.extension.length === 4
  const domain = getCompanyDomain(data.selectedLogo)
  
  // Get current company logo configuration
  const currentLogoConfig = getLogoConfig(data.selectedLogo)
  
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

  // Compute second (anniversary) logo width based on intrinsic aspect ratio at fixed height 90px,
  // use exact measured width to avoid extra right-side spacing for narrow logos (fallback 177)
  useEffect(() => {
    const compute = async () => {
      if (!data.secondLogoBase64) {
        setSecondLogoComputedWidth(null)
        return
      }
      const img = new Image()
      img.onload = () => {
        if (img.height > 0) {
          const aspectRatio = img.width / img.height
          const measured = Math.round(90 * aspectRatio)
          setSecondLogoComputedWidth(measured)
        } else {
          setSecondLogoComputedWidth(177)
        }
      }
      img.onerror = () => setSecondLogoComputedWidth(177)
      img.src = data.secondLogoBase64
    }
    compute()
  }, [data.secondLogoBase64])

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
                  width: secondLogoComputedWidth ? `${secondLogoComputedWidth}px` : "177px",
                  minWidth: secondLogoComputedWidth ? `${secondLogoComputedWidth}px` : "177px",
                  maxWidth: secondLogoComputedWidth ? `${secondLogoComputedWidth}px` : "177px",
                  borderRight: "1pt solid black",
                  borderTop: "0",
                  borderBottom: "0",
                  borderLeft: "0",
                  padding: "0px",
                  verticalAlign: "top",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px 0",
                    padding: "0",
                    lineHeight: "0",
                    fontSize: "10pt",
                    textAlign: "left",
                    display: "inline-block",
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
                  textAlign: "left",
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
                  textAlign: "left",
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
                  textAlign: "left",
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
                  textAlign: "left",
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
                  textAlign: "left",
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
                    textAlign: "left",
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
                    textAlign: "left",
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
