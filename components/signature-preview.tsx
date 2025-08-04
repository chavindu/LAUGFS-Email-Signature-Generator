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
  }
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

export function SignaturePreview({ data }: SignaturePreviewProps) {
  const [logoWidth, setLogoWidth] = useState<number | undefined>(undefined)
  const [nameWidth, setNameWidth] = useState<number | undefined>(undefined)
  const logoRef = useRef<HTMLImageElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (logoRef.current) {
      const handleLoad = () => {
        setLogoWidth(logoRef.current?.naturalWidth ? (logoRef.current.naturalWidth * 48) / logoRef.current.naturalHeight : undefined)
      }
      const img = logoRef.current
      img?.addEventListener('load', handleLoad)
      // If already loaded
      if (img?.complete) handleLoad()
      return () => img?.removeEventListener('load', handleLoad)
    }
  }, [data.logoBase64])

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
        
        // Use the maximum width plus more padding for better fit
        const maxWidth = Math.max(nameWidth, designationWidth, departmentWidth) + 60
        setNameWidth(maxWidth)
      }
    }
  }, [data.fullName, data.designation, data.department])

  const showContactInfo = data.extension.length === 4
  const domain = companyDomains[data.selectedLogo] || companyDomains["holdings"]

  return (
    <div className="border rounded-lg p-4 bg-white overflow-auto">
      <table
        style={{
          borderCollapse: "collapse",
          width: "670.5pt",
          fontFamily: "Calibri, sans-serif",
          fontSize: "10px",
          marginLeft: "6.75pt",
          marginRight: "6.75pt",
          border: "none",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                width: logoWidth ? `${logoWidth}px` : "auto",
                borderRight: "1pt solid black",
                borderTop: "0",
                borderBottom: "0",
                borderLeft: "0",
                padding: "0in 0.2in 0in 0.2in",
                verticalAlign: "top",
              }}
            >
              <p
                style={{
                  marginTop: "12.0pt",
                  marginBottom: "8.0pt",
                  lineHeight: "115%",
                }}
              >
                <img
                  ref={logoRef}
                  src={data.logoBase64 || "/images/holdings-logo.png"}
                  alt="Company Logo"
                  style={{ display: "block", height: "48px", width: "auto", objectFit: "contain" }}
                />
              </p>
            </td>
            <td
              style={{
                width: nameWidth ? `${nameWidth}px` : "auto",
                borderRight: "1pt solid black",
                borderTop: "0",
                borderBottom: "0",
                borderLeft: "0",
                padding: "0in 0in 0in 0.2in",
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
                }}
              >
                {data.department}
              </p>
            </td>
            <td
              style={{
                width: "324.25pt",
                borderTop: "0",
                borderBottom: "0",
                borderLeft: "0",
                borderRight: "0",
                padding: "0in 0in 0in 0.2in",
                verticalAlign: "top",
              }}
            >
              <p
                style={{
                  marginTop: "12.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
                  fontSize: "10pt",
                }}
              >
                {data.address}
              </p>
              <p
                style={{
                  marginTop: "4.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
                  fontSize: "10pt",
                }}
              >
                Mobile: {data.mobile} | Tel: +94 11 55 66 222
              </p>
              {showContactInfo && (
                <p
                  style={{
                    marginTop: "4.0pt",
                    marginBottom: "8.0pt",
                    lineHeight: "1.0",
                    fontSize: "10pt",
                  }}
                >
                  Direct: {data.direct} | Ext: {data.extension}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              style={{
                width: "670.5pt",
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
