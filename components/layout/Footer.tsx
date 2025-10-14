import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Youtube, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo/logo_150x150.png"
                alt="Pak Wattan School"
                width={50}
                height={50}
                className="w-12 h-12"
                priority
              />
              <div>
                <h3 className="text-xl font-bold text-white font-josefin">
                  PAK WATTAN
                </h3>
                <p className="text-sm text-secondary-300">
                  School & College of Sciences
                </p>
              </div>
            </div>
            <p className="text-secondary-300 text-sm leading-relaxed">
              Established in 2020, Pak Wattan School & College of Sciences is committed to providing 
              quality education with affordable expenses in Havelian, KPK.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/PAKWATTAN2020/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtu.be/edf2-HxPxxs?si=Az95EFwCE2cY1UJP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/WattanAnd?s=20&t=Fhqy3yMnnMGjq84gHEp5Sw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/admission" className="text-secondary-300 hover:text-white transition-colors">
                  Admission
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-secondary-300 hover:text-white transition-colors">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-secondary-300 hover:text-white transition-colors">
                  Facilities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Academic</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/academic/montessori" className="text-secondary-300 hover:text-white transition-colors">
                  Montessori
                </Link>
              </li>
              <li>
                <Link href="/academic/primary" className="text-secondary-300 hover:text-white transition-colors">
                  Primary
                </Link>
              </li>
              <li>
                <Link href="/academic/matric" className="text-secondary-300 hover:text-white transition-colors">
                  Matric
                </Link>
              </li>
              <li>
                <Link href="/talent-hunt" className="text-secondary-300 hover:text-white transition-colors">
                  Talent Hunt
                </Link>
              </li>
              <li>
                <Link href="/awards" className="text-secondary-300 hover:text-white transition-colors">
                  Awards
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-300 text-sm">
                    Azam Khan road, beside Mubarak Plaza,<br />
                    Havelian, Abbottabad, KPK, Pakistan
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="tel:+923180821377" 
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  0318 0821377
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="mailto:pakwattan2020@gmail.com" 
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  pakwattan2020@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © 2024 Pak Wattan School & College of Sciences. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-secondary-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-secondary-400 hover:text-white transition-colors">
                Terms and Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
