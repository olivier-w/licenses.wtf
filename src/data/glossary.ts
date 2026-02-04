import type { GlossaryTerm } from "../lib/types";

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "copyleft",
    term: "Copyleft",
    definition:
      "A licensing approach that requires anyone who distributes the software, or a modified version of it, to make the source code available under the same license. It ensures the software and its derivatives remain free and open. The GPL is the most well-known copyleft license.",
  },
  {
    id: "permissive",
    term: "Permissive License",
    definition:
      "A type of open source license that places minimal restrictions on how the software can be used, modified, and redistributed. Permissive licenses generally only require attribution (keeping the copyright notice). Examples include MIT, BSD, and Apache 2.0.",
  },
  {
    id: "spdx",
    term: "SPDX (Software Package Data Exchange)",
    definition:
      "A standardized format for communicating license information about software packages. SPDX identifiers are short codes like \"MIT\", \"GPL-3.0-only\", or \"Apache-2.0\" that uniquely identify licenses, making it easier to track and manage licensing across projects.",
  },
  {
    id: "osi",
    term: "OSI (Open Source Initiative)",
    definition:
      "A non-profit organization that maintains the Open Source Definition and reviews licenses to determine whether they qualify as genuinely open source. An \"OSI-approved\" license has been vetted against a set of criteria including free redistribution, access to source code, and no discrimination.",
  },
  {
    id: "derivative-work",
    term: "Derivative Work",
    definition:
      "A new piece of software that is based on or incorporates existing copyrighted code. When you modify, extend, or build upon someone else's code, the result may be considered a derivative work. Whether your project counts as a derivative work often determines which license obligations apply to you.",
  },
  {
    id: "patent-grant",
    term: "Patent Grant",
    definition:
      "A clause in a license that explicitly gives users permission to use any patents held by the contributors that cover the software. This protects users from being sued for patent infringement by the very people who wrote the code. Apache 2.0 includes a patent grant; MIT and BSD do not.",
  },
  {
    id: "sublicense",
    term: "Sublicense",
    definition:
      "The right to grant others permission to use the software under the same or compatible terms. When a license allows sublicensing, you can pass along usage rights to third parties. This is important for distributing software that incorporates open source components.",
  },
  {
    id: "source-code",
    term: "Source Code",
    definition:
      "The human-readable form of a program, written in a programming language like Python, JavaScript, or C. This is what developers write and edit. Some licenses require that source code be made available whenever the software is distributed, so that others can study and modify it.",
  },
  {
    id: "binary",
    term: "Binary (Compiled Code)",
    definition:
      "The machine-readable, compiled form of a program that can be run directly by a computer. Unlike source code, binaries are not human-readable. Some licenses allow you to distribute only binaries, while copyleft licenses typically require you to also provide the corresponding source code.",
  },
  {
    id: "linking",
    term: "Linking",
    definition:
      "The process of combining a software library with your own code to create a working program. Static linking bundles the library directly into your executable, while dynamic linking loads it at runtime. The type of linking can affect whether copyleft obligations extend to your code, especially with licenses like the GPL and LGPL.",
  },
  {
    id: "distribution",
    term: "Distribution",
    definition:
      "The act of making software available to others, whether by sharing copies, publishing downloads, or shipping products. Most open source license obligations are triggered by distribution. If you only use the software privately within your organization, many license conditions do not apply.",
  },
  {
    id: "proprietary",
    term: "Proprietary Software",
    definition:
      "Software whose source code is not made available to users and whose use is restricted by the terms set by the owner. Users typically receive only the compiled binary and are prohibited from modifying, copying, or redistributing it. The opposite of open source software.",
  },
  {
    id: "dual-licensing",
    term: "Dual Licensing",
    definition:
      "A strategy where software is offered under two different licenses, typically one open source and one commercial. Users who can comply with the open source license (e.g., GPL) use it for free, while those who need different terms (e.g., to keep their code proprietary) purchase a commercial license. MySQL and Qt are well-known examples.",
  },
  {
    id: "cla",
    term: "Contributor License Agreement (CLA)",
    definition:
      "A legal agreement between a contributor and a project maintainer that defines the terms under which contributions are made. CLAs often grant the maintainer the right to relicense contributions, which makes it possible to change the project's license in the future or offer dual licensing without getting permission from every contributor.",
  },
  {
    id: "fair-use",
    term: "Fair Use",
    definition:
      "A legal doctrine (primarily in U.S. law) that allows limited use of copyrighted material without permission for purposes such as commentary, criticism, education, or research. Fair use is determined case by case and is not a reliable defense for using unlicensed code in a software project. When in doubt, always check the license.",
  },
  {
    id: "tivoization",
    term: "Tivoization",
    definition:
      "The practice of using hardware restrictions to prevent users from running modified software on a device, even when the software's license gives them the right to modify it. Named after TiVo, which used GPL-licensed Linux but locked its hardware to reject modified software. GPL v3 was written specifically to prohibit this practice.",
  },
  {
    id: "patent-retaliation",
    term: "Patent Retaliation",
    definition:
      "A clause found in licenses like Apache 2.0 that terminates the patent grant if a licensee initiates patent litigation related to the software. If you sue a contributor claiming their code infringes your patents, you lose the patent license they granted you. This discourages patent warfare within open source communities.",
  },
  {
    id: "fork",
    term: "Fork",
    definition:
      "A copy of a software project that is developed independently from the original. Forks are a fundamental right granted by most open source licenses. They can be friendly (feature experiments that may merge back) or hostile (a permanent split due to disagreements). Notable forks include LibreOffice from OpenOffice and OpenTofu from Terraform.",
  },
  {
    id: "or-later-clause",
    term: '"Or Later" Clause',
    definition:
      'A provision in GPL-family licenses where the author specifies "GPL v2 or any later version" (GPL-2.0-or-later) instead of "GPL v2 only" (GPL-2.0-only). This allows downstream users to comply with the terms of a later GPL version if they choose. The distinction matters enormously: GPL-2.0-only code cannot be combined with GPL-3.0-only code, but GPL-2.0-or-later code can.',
  },
  {
    id: "notice-file",
    term: "NOTICE File",
    definition:
      "A file required by the Apache License 2.0 that contains attribution notices for the project and its contributors. When redistributing Apache-licensed code, you must include the NOTICE file alongside the LICENSE file. It typically contains the project name, copyright holders, and any required third-party attributions.",
  },
  {
    id: "sbom",
    term: "SBOM (Software Bill of Materials)",
    definition:
      "A formal inventory of all components, libraries, and dependencies used in a piece of software, including their versions and licenses. SBOMs are increasingly mandated by government regulations and enterprise procurement policies to ensure license compliance and identify security vulnerabilities across the software supply chain.",
  },
];
