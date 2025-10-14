'use client'

const TopNewsMarquee = () => {
  return (
    <div className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400 text-black py-4 pt-10 text-lg font-bold shadow-lg">
      <div className="container-custom text-center">
        <div className="overflow-hidden relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-accent-400 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-accent-400 to-transparent z-10"></div>
          
          <div className="animate-marquee whitespace-nowrap">
            <span className="inline-block mr-12 px-4 py-1 bg-white/20 rounded-full">
              🏆 Once again, honored to top the Havelian Circle
            </span>
            <span className="inline-block mr-12 px-4 py-1 bg-white/20 rounded-full">
              🎓 FSC 2025 Abbottabad Board Results Congratulations to the Havelian Circle Topper!
            </span>
            <span className="inline-block mr-12 px-4 py-1 bg-white/20 rounded-full">
              🥇 Qasim Zaib | 202835 | Marks: 1035 (Pak Wattan Boys Wing) Overall First Position in the Havelian Circle in HSSC (Boys) Board Results 2024, Computer Science Group
            </span>
            <span className="inline-block mr-12 px-4 py-1 bg-white/20 rounded-full">
              🥇 Umme Habiba | Marks:534| Overall First Position in the Havelian Circle in HSSC Part-I Board Results 2025, Pre Medical Group
            </span>
            <span className="inline-block mr-12 px-4 py-1 bg-white/20 rounded-full">
              🥇 Rashail Waheed |Marks: 524| (Overall First Position in HSSC-Part 1 (Pre-Engeneering Group) Board Results 2024
            </span>
            <span className="inline-block mr-12 px-4 py-1 bg-white/20 rounded-full">
              🥇 Toheed Ahmed |Marks: 528| 1st Position in the Computer Science Group (Havelian Circle)
            </span>
            <span className="inline-block mr-12 px-4 py-1 bg-white/20 rounded-full">
              🥈 Haleema Waqar | Marks: 1135 | (Pak Wattan Girls Campus) 2nd Position in the Pre-Medical Group (Overall in Havelian Circle) in HSSC
            </span>
            <span className="inline-block mr-12 px-4 py-1 bg-white/20 rounded-full">
              🏅 Laiba Ashraf Marks | 1103 |
            </span>
            <span className="inline-block mr-12 px-4 py-1 bg-white/20 rounded-full">
              🏅 Umama Hafeez Marks | 1103 |
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNewsMarquee
