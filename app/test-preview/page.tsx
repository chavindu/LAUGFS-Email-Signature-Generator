"use client"

import { TinyMCEPreview } from "@/components/tinymce-preview"

export default function TestPreviewPage() {
  const testHTML = `
    <table style="border-collapse:collapse;width:670.5pt;margin-left:6.75pt;margin-right:6.75pt;border:none;">
      <tbody>
          <tr>
              <td style="width:200px;border-right:1pt solid black;border-top:none;border-bottom:none;border-left:none;padding:0in 0.2in 0in 0.2in;vertical-align:top;">
                  <p style="margin-top:12.0pt;margin-bottom:8.0pt;line-height:115%;font-size:10px;font-family:Calibri,sans-serif;">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9nbyBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=" alt="Company Logo" style="display:block;height:48px;width:auto;object-fit:contain;">
                  </p>
              </td>
              <td style="width:250px;border-right:1pt solid black;border-top:none;border-bottom:none;border-left:none;padding:0in 0in 0in 0.2in;vertical-align:top;">
                  <p style="margin-top:12.0pt;margin-bottom:4.0pt;line-height:1.0;font-size:10px;font-family:Calibri,sans-serif;"><strong>JOHN DOE</strong></p>
                  <p style="margin-top:4.0pt;margin-bottom:4.0pt;line-height:1.0;font-size:10px;font-family:Calibri,sans-serif;">Senior Executive</p>
                  <p style="margin-top:4.0pt;margin-bottom:8.0pt;line-height:1.0;font-size:10px;font-family:Calibri,sans-serif;">IT Service Management</p>
              </td>
              <td style="width:324.25pt;border-top:none;border-bottom:none;border-left:none;border-right:none;padding:0in 0in 0in 0.2in;vertical-align:top;">
                  <p style="margin-top:12.0pt;margin-bottom:4.0pt;line-height:1.0;font-size:10px;font-family:Calibri,sans-serif;">3rd Floor, No 101, Maya Avenue, Colombo 6, Sri Lanka.</p>
                  <p style="margin-top:4.0pt;margin-bottom:4.0pt;line-height:1.0;font-size:10px;font-family:Calibri,sans-serif;">Mobile: +94 77 12 34 567 | Tel: +94 11 55 66 222</p>
                  <p style="margin-top:4.0pt;margin-bottom:8.0pt;line-height:1.0;font-size:10px;font-family:Calibri,sans-serif;">Direct: +94 11 55 66 413 | Ext: 6413</p>
              </td>
          </tr>
          <tr>
              <td colspan="3" style="width:670.5pt;background:#FFC000;border:none;padding:0in 0in 0in 0.2in;">
                  <p style="margin:0;line-height:115%;font-size:10px;font-family:Calibri,sans-serif;"><span style="color:#467886;"><a href="https://www.laugfs.lk" target="_blank" style="color:#467886;font-weight:bold;text-decoration:underline;">www.laugfs.lk</a></span></p>
              </td>
          </tr>
      </tbody>
    </table>
  `

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Preview Test Page</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Test HTML Content:</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-40">
          {testHTML}
        </pre>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Preview Output:</h2>
        <TinyMCEPreview htmlContent={testHTML} />
      </div>
    </div>
  )
} 