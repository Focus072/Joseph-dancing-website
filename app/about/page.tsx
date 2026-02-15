import Header from "../components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Joseph's Dancing Highlights",
  description: "Learn about Joseph's dance journey, training, performance experience, and aspirations. Professional resume for college applications.",
  keywords: ["dancer", "dance resume", "dance training", "performance", "choreography", "Joseph"],
};

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative min-h-screen bg-white">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-12 md:pb-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900 px-2">
              About Joseph
            </h1>
            <div className="w-20 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              A passionate dancer dedicated to expressing artistry through movement, 
              committed to excellence, and driven to pursue higher education in dance.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="space-y-8 md:space-y-16">
            {/* About Me Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-200 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></span>
                About Me
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Dance has been my passion and creative outlet for as long as I can remember. 
                  Through years of dedicated training and performance, I have developed a deep 
                  understanding of movement, rhythm, and artistic expression. My journey in dance 
                  has taught me discipline, perseverance, and the importance of continuous growth.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  I believe that dance is more than just movement—it's a form of storytelling, 
                  a way to connect with audiences, and a means of personal and artistic development. 
                  As I prepare for the next chapter of my journey, I am excited to bring my passion, 
                  dedication, and unique artistic voice to a collegiate dance program.
                </p>
              </div>
            </div>

            {/* Training & Experience */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xl">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                  <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></span>
                  Training & Education
                </h2>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">▸</span>
                    <span>Extensive training in multiple dance styles including contemporary, ballet, jazz, and modern</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">▸</span>
                    <span>Regular participation in workshops and masterclasses with renowned choreographers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">▸</span>
                    <span>Continuous technical development and artistic exploration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">▸</span>
                    <span>Focus on both performance excellence and choreographic development</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xl">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                  <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></span>
                  Performance Experience
                </h2>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">▸</span>
                    <span>Regular performances in recitals, showcases, and competitions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">▸</span>
                    <span>Experience performing both as a soloist and in ensemble pieces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">▸</span>
                    <span>Participation in community events and cultural performances</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3">▸</span>
                    <span>Collaboration with fellow dancers and choreographers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Skills & Strengths */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-200 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></span>
                Skills & Strengths
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">Technical Excellence</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Strong foundation in dance technique with attention to detail, alignment, and precision.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-purple-600 mb-3">Artistic Expression</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Ability to convey emotion and tell stories through movement, connecting with audiences.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-pink-600 mb-3">Collaboration</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Works effectively in group settings, supporting fellow dancers and contributing to ensemble work.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">Discipline</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Committed to regular practice, continuous improvement, and maintaining high standards.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-purple-600 mb-3">Versatility</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Comfortable across multiple dance styles and adaptable to different choreographic approaches.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-pink-600 mb-3">Growth Mindset</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Eager to learn, open to feedback, and dedicated to expanding artistic horizons.
                  </p>
                </div>
              </div>
            </div>

            {/* Goals & Aspirations */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-200 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4"></span>
                Goals & Aspirations
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  My primary goal is to pursue a comprehensive dance education at the collegiate level, 
                  where I can further develop my technical skills, expand my artistic vocabulary, and 
                  deepen my understanding of dance as both an art form and a discipline.
                </p>
                <p>
                  I am particularly interested in exploring choreography, dance history, and the intersection 
                  of dance with other art forms. I hope to contribute to a vibrant dance community, learn 
                  from experienced faculty and peers, and prepare for a future career in dance performance, 
                  education, or choreography.
                </p>
                <p className="text-blue-600 font-semibold">
                  I am excited about the opportunity to bring my passion, dedication, and unique perspective 
                  to your dance program and to grow as both an artist and a person.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-200 shadow-xl text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Let's Connect</h2>
              <p className="text-gray-600 text-sm sm:text-base mb-4 md:mb-6 max-w-2xl mx-auto px-4">
                I would be honored to discuss my passion for dance and how I can contribute to your program. 
                Please feel free to reach out through the contact information provided.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-gray-700">
                <div className="px-6 py-3 bg-white rounded-lg border border-gray-200">
                  <span className="text-sm text-gray-500">Portfolio</span>
                  <p className="font-medium">josephsdancinghighlights.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
