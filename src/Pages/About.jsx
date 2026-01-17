import { motion } from "framer-motion";
import { Users, Globe, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-base-100 px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="text-primary">ClubSphere</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-base-content/70">
            ClubSphere is a modern platform designed to connect clubs,
            communities, and people—bringing events, collaboration, and growth
            into one powerful ecosystem.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card bg-base-200 shadow-xl"
          >
            <div className="card-body space-y-3">
              <h2 className="card-title text-2xl">Our Mission</h2>
              <p className="text-base-content/70">
                To empower clubs and organizations with simple, powerful tools
                that boost engagement and streamline management.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card bg-base-200 shadow-xl"
          >
            <div className="card-body space-y-3">
              <h2 className="card-title text-2xl">Our Vision</h2>
              <p className="text-base-content/70">
                A connected world where every club—local or global—can grow,
                collaborate, and make meaningful impact.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <h2 className="text-3xl font-bold text-center">What We Stand For</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body items-start space-y-4">
                <Users className="h-9 w-9 text-primary" />
                <h3 className="text-xl font-semibold">Community First</h3>
                <p className="text-base-content/70">
                  Building strong, inclusive communities is at the core of
                  everything we do.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg">
              <div className="card-body items-start space-y-4">
                <Sparkles className="h-9 w-9 text-primary" />
                <h3 className="text-xl font-semibold">Innovation</h3>
                <p className="text-base-content/70">
                  We leverage modern technology to keep clubs ahead of the
                  curve.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg">
              <div className="card-body items-start space-y-4">
                <Globe className="h-9 w-9 text-primary" />
                <h3 className="text-xl font-semibold">Global Reach</h3>
                <p className="text-base-content/70">
                  From campus clubs to global communities, ClubSphere scales
                  with your ambition.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-2xl font-semibold">Why Choose ClubSphere?</h2>
          <p className="mx-auto max-w-2xl text-base-content/70">
            Whether you’re organizing events, managing members, or expanding
            your reach, ClubSphere helps you focus on what matters most—your
            community.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
