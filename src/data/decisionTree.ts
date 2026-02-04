import type { DecisionNode } from "../lib/types";

export const decisionTree: DecisionNode[] = [
  {
    id: "start",
    question: "What's most important to you?",
    options: [
      {
        label: "Maximum freedom for users",
        description:
          "Let anyone use your code for anything with minimal requirements",
        nextNodeId: "permissive-patent",
      },
      {
        label: "Ensuring improvements stay open",
        description:
          "Require that modifications to your code remain open source",
        nextNodeId: "copyleft-strength",
      },
      {
        label: "Protecting against SaaS use",
        description:
          "Prevent companies from running your code as a service without contributing back",
        nextNodeId: "saas-protection",
      },
      {
        label: "Just want to put it in the public domain",
        description:
          "Give up all rights and let anyone do anything with no conditions at all",
        nextNodeId: null,
        resultLicenses: ["cc0-1.0", "unlicense"],
        resultReasoning:
          "CC0 and the Unlicense both dedicate your work to the public domain. CC0 is generally preferred because it was drafted by Creative Commons with extensive international legal analysis, making it more robust across jurisdictions. The Unlicense is simpler and more concise. Both result in zero obligations for users.",
      },
    ],
  },
  {
    id: "permissive-patent",
    question: "Do you need patent protection?",
    options: [
      {
        label: "Yes, include a patent grant",
        description:
          "Protect users from patent claims by contributors",
        nextNodeId: null,
        resultLicenses: ["apache-2.0"],
        resultReasoning:
          "Apache 2.0 is a permissive license that includes an explicit patent grant, protecting users from patent litigation by contributors. It also requires attribution and a notice of changes. It is widely used by major organizations including the Apache Software Foundation, Google, and Microsoft.",
      },
      {
        label: "No, keep it simple",
        description:
          "A short, straightforward license focused on simplicity",
        nextNodeId: "permissive-style",
      },
    ],
  },
  {
    id: "permissive-style",
    question: "Which style do you prefer?",
    options: [
      {
        label: "The most popular and widely recognized",
        description:
          "Maximum community familiarity and ecosystem compatibility",
        nextNodeId: null,
        resultLicenses: ["mit"],
        resultReasoning:
          "MIT is the most popular open source license. It is short, simple, and well-understood by everyone. It allows virtually any use as long as the copyright notice is included. If you have no strong preference, MIT is the safe default.",
      },
      {
        label: "Even simpler, fewer clauses",
        description:
          "The most minimal permissive license possible",
        nextNodeId: null,
        resultLicenses: ["isc"],
        resultReasoning:
          "The ISC license is functionally equivalent to MIT but with simpler, more concise language. It removes some outdated phrasing found in the MIT license. It is the default license for npm packages and is preferred by developers who value brevity.",
      },
      {
        label: "Include a non-endorsement clause",
        description:
          "Prevent others from using your name to promote their products",
        nextNodeId: null,
        resultLicenses: ["bsd-3-clause"],
        resultReasoning:
          "The 3-Clause BSD license includes a clause that prevents others from using your name or the names of contributors to endorse or promote derived products without permission. It is widely used by projects like Go, Nginx, and CMake.",
      },
    ],
  },
  {
    id: "copyleft-strength",
    question: "How strongly should changes be shared back?",
    options: [
      {
        label: "Only changed files must stay open source",
        description:
          "Your own files must stay open, but larger works can use any license",
        nextNodeId: null,
        resultLicenses: ["mpl-2.0"],
        resultReasoning:
          "The Mozilla Public License 2.0 is a file-level copyleft license. Modified files must remain open source, but you can combine MPL code with proprietary code in a larger project. This makes it a good middle ground between permissive and strong copyleft, and it is compatible with the GPL.",
      },
      {
        label: "Entire derivative works must stay open source",
        description:
          "Any project built on your code must also be open source",
        nextNodeId: "strong-copyleft-library",
      },
      {
        label: "Including network use (server-side counts)",
        description:
          "Even running modified code on a server triggers the sharing requirement",
        nextNodeId: null,
        resultLicenses: ["agpl-3.0"],
        resultReasoning:
          "The AGPL 3.0 closes the SaaS loophole in the GPL. If you run modified AGPL code on a server and users interact with it over a network, you must release the source code. This is the strongest widely-used copyleft license and is popular for server-side software like databases and web applications.",
      },
    ],
  },
  {
    id: "strong-copyleft-library",
    question: "Is your project a library used by other projects?",
    options: [
      {
        label: "Yes, it's a library",
        description:
          "Other developers will link to or import your code in their projects",
        nextNodeId: null,
        resultLicenses: ["lgpl-3.0"],
        resultReasoning:
          "The LGPL 3.0 is designed specifically for libraries. It requires that modifications to the library itself remain open source, but applications that simply use (link to) the library are not required to be open source. This encourages wider adoption of your library while still protecting improvements to it.",
      },
      {
        label: "No, it's a standalone application or framework",
        description:
          "End users run your software directly or build on top of it",
        nextNodeId: "gpl-version",
      },
    ],
  },
  {
    id: "gpl-version",
    question: "Which GPL version do you prefer?",
    options: [
      {
        label: "GPL 3.0 (recommended, modern protections)",
        description:
          "Includes patent protection and anti-tivoization clauses",
        nextNodeId: null,
        resultLicenses: ["gpl-3.0"],
        resultReasoning:
          "GPL 3.0 is the latest version and includes modern protections against patent abuse and hardware restrictions (tivoization). It ensures that users who receive the software can always modify and run their own versions. This is the recommended choice for new projects that want strong copyleft.",
      },
      {
        label: "GPL 2.0 (Linux kernel compatible)",
        description:
          "The classic version, widely used and well-understood",
        nextNodeId: null,
        resultLicenses: ["gpl-2.0"],
        resultReasoning:
          "GPL 2.0 is the classic copyleft license used by the Linux kernel and many established projects. It lacks the patent grant and anti-tivoization protections of GPL 3.0, but it has decades of legal precedent and is required for compatibility with Linux kernel contributions.",
      },
    ],
  },
  {
    id: "saas-protection",
    question: "Do you want your code to remain fully open source, or restrict commercial SaaS use?",
    options: [
      {
        label: "Stay fully open source (AGPL approach)",
        description:
          "Use a strong copyleft license that requires SaaS providers to share their changes",
        nextNodeId: null,
        resultLicenses: ["agpl-3.0"],
        resultReasoning:
          "The AGPL 3.0 requires that anyone who modifies the code and provides it as a network service must release their source code. This is a true open source license approved by the OSI, and it prevents SaaS companies from taking your code without contributing back.",
      },
      {
        label: "Use a source-available restriction",
        description:
          "Allow viewing and non-production use, but restrict competing SaaS offerings",
        nextNodeId: null,
        resultLicenses: ["bsl-1.1"],
        resultReasoning:
          "The Business Source License (BSL) allows you to make your code viewable and usable for non-production purposes, while restricting commercial use (especially competing SaaS offerings) until a specified change date when it converts to an open source license. Note that the BSL is not considered open source by the OSI.",
      },
    ],
  },
];
