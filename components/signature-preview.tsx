interface SignaturePreviewProps {
  data: {
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

const companyDomains = {
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
  const showContactInfo = data.extension.length === 4
  const domain = companyDomains[data.selectedLogo] || companyDomains["holdings"]

  return (
    <div className="border rounded-lg p-4 bg-white overflow-auto">
      <table
        style={{
          borderCollapse: "collapse",
          width: "670.5pt",
          fontFamily: "Aptos, sans-serif",
          fontSize: "16px",
          marginLeft: "6.75pt",
          marginRight: "6.75pt",
          border: "none",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                width: "166.25pt",
                borderRight: "1pt solid black",
                borderTop: "none",
                borderBottom: "none",
                borderLeft: "none",
                padding: "0in 0in 0in 0.2in",
                verticalAlign: "top",
              }}
            >
              <p
                style={{
                  marginTop: "12.0pt",
                  marginBottom: "8.0pt",
                  marginLeft: "-14.05pt",
                  lineHeight: "115%",
                }}
              >
                <img
                  width="208"
                  height="64"
                  src={data.logoBase64 || "/images/holdings-logo.png"}
                  alt="Company Logo"
                  style={{ display: "block", maxHeight: "64px", width: "auto", maxWidth: "208px" }}
                />
              </p>
            </td>
            <td
              style={{
                width: "2.5in",
                borderRight: "1pt solid black",
                borderTop: "none",
                borderBottom: "none",
                borderLeft: "none",
                padding: "0in 0in 0in 0.2in",
                verticalAlign: "top",
              }}
            >
              <p
                style={{
                  marginTop: "12.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
                }}
              >
                <strong>{data.fullName}</strong>
              </p>
              <p
                style={{
                  marginTop: "4.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
                }}
              >
                {data.designation}
              </p>
              <p
                style={{
                  marginTop: "4.0pt",
                  marginBottom: "8.0pt",
                  lineHeight: "1.0",
                }}
              >
                {data.department}
              </p>
            </td>
            <td
              style={{
                width: "324.25pt",
                border: "none",
                padding: "0in 0in 0in 0.2in",
                verticalAlign: "top",
              }}
            >
              <p
                style={{
                  marginTop: "12.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
                }}
              >
                {data.address}
              </p>
              <p
                style={{
                  marginTop: "4.0pt",
                  marginBottom: "4.0pt",
                  lineHeight: "1.0",
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
                border: "none",
                padding: "0in 0in 0in 0.2in",
              }}
            >
              <p
                style={{
                  margin: "0",
                  lineHeight: "115%",
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
