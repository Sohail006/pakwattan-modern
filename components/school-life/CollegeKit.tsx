'use client'

// import { Package, BookOpen, Shirt, Pen, Globe, Microscope, Laptop } from 'lucide-react'

const CollegeKit = () => {
  const kitItems = [
    { srNo: 1, item: 'White Shirt', quantity: '03' },
    { srNo: 2, item: 'White Trouser', quantity: '02' },
    { srNo: 3, item: 'White Socks', quantity: '03' },
    { srNo: 4, item: 'White Shoes', quantity: '01' },
    { srNo: 5, item: 'White Belt', quantity: '01' },
    { srNo: 6, item: 'White Cap', quantity: '01' },
    { srNo: 7, item: 'White Handkerchief', quantity: '03' },
    { srNo: 8, item: 'White Towel', quantity: '02' },
    { srNo: 9, item: 'White Bed Sheet', quantity: '02' },
    { srNo: 10, item: 'White Pillow Cover', quantity: '02' },
    { srNo: 11, item: 'White Blanket', quantity: '01' },
    { srNo: 12, item: 'White Quilt', quantity: '01' },
    { srNo: 13, item: 'White Curtain', quantity: '02' },
    { srNo: 14, item: 'White Table Cloth', quantity: '01' },
    { srNo: 15, item: 'White Napkin', quantity: '03' },
    { srNo: 16, item: 'White Apron', quantity: '01' },
    { srNo: 17, item: 'White Gloves', quantity: '01' },
    { srNo: 18, item: 'White Mask', quantity: '03' },
    { srNo: 19, item: 'White Gown', quantity: '01' },
    { srNo: 20, item: 'White Scarf', quantity: '01' },
    { srNo: 21, item: 'White Shawl', quantity: '01' },
    { srNo: 22, item: 'White Sweater', quantity: '01' },
    { srNo: 23, item: 'Trunk', quantity: '01' },
  ]

  return (
    <section id="college-kit" className="section-padding bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">COLLEGE KIT</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Every student is required to have a complete college kit as specified below. The kit should be purchased from the authorized supplier and all items must be clearly marked with the student's name.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-6">
            <h3 className="text-2xl font-bold text-white text-center">Required College Kit Items</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Sr.No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {kitItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.srNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.item}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-yellow-50 rounded-2xl shadow-lg border border-yellow-200 p-8">
            <h3 className="text-2xl font-bold text-yellow-800 mb-6 text-center">Important Notes</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Kit Requirements</h4>
                <p className="text-gray-700 leading-relaxed">
                  Every boy is required to have full College Kit. Items not in the official list should not be brought to the college.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Marking & Responsibility</h4>
                <p className="text-gray-700 leading-relaxed">
                  While every precaution is taken, the college is not responsible for any loss or damage. It will be of great help, if all articles of clothing are clearly marked showing the body's brief name in indelible ink.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollegeKit
