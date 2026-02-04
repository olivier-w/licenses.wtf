import type { Misconception } from "../lib/types";

export const misconceptions: Misconception[] = [
  {
    id: "no-license-free",
    myth: "If there's no license, the code is free to use",
    reality:
      "Without a license, code is protected by default copyright. The author retains all rights, and nobody else can legally copy, modify, or distribute the code. No license means more restrictions, not fewer. If you want people to use your code, you must explicitly add a license.",
  },
  {
    id: "mit-anything",
    myth: "MIT means you can do literally anything with the code",
    reality:
      "MIT is very permissive, but it still has one key condition: you must include the original copyright notice and license text in any copies or substantial portions of the software. You also cannot hold the author liable or claim they provide a warranty.",
  },
  {
    id: "gpl-no-money",
    myth: "GPL means you can't make money from the software",
    reality:
      "The GPL explicitly allows commercial use. You can sell GPL-licensed software, charge for support, or build a business around it. What the GPL requires is that if you distribute the software (or modified versions), you must also make the source code available under the same license. Companies like Red Hat have built billion-dollar businesses on GPL software.",
  },
  {
    id: "gpl-viral-always",
    myth: "Using a GPL library makes my entire project GPL",
    reality:
      "It depends on how you use the library. Dynamically linking to a GPL library, using it as a separate process, or interacting via a network API generally does not require your code to be GPL. Static linking and directly incorporating GPL code into your project typically does trigger the copyleft requirement. The LGPL was specifically created to allow library use without this concern.",
  },
  {
    id: "open-source-no-restrictions",
    myth: "Open source means there are no restrictions at all",
    reality:
      "Every open source license has conditions. Even the most permissive licenses like MIT and BSD require you to include the copyright notice. Copyleft licenses add requirements to share modifications. 'Open source' means the source code is available and you have specific freedoms, but those freedoms always come with responsibilities.",
  },
  {
    id: "change-license-anytime",
    myth: "I can just change the license on my project whenever I want",
    reality:
      "If you are the sole author, you can relicense your code. But if others have contributed, they retain copyright over their contributions. Changing the license requires permission from every contributor, unless you have a Contributor License Agreement (CLA) in place. Previous versions also remain under their original license.",
  },
  {
    id: "agpl-only-saas",
    myth: "AGPL only matters if you're running a SaaS product",
    reality:
      "The AGPL's network-interaction clause applies to any situation where users interact with the software over a network, not just commercial SaaS. This includes internal tools served to employees, self-hosted applications accessed via a browser, and any server-side software that communicates with clients. If users interact with it remotely, the AGPL source-sharing requirement kicks in.",
  },
  {
    id: "bsd-mit-same",
    myth: "BSD and MIT licenses are basically the same thing",
    reality:
      "While both are permissive, there are subtle differences. The 2-Clause BSD and MIT are very similar in effect, but the 3-Clause BSD adds a non-endorsement clause preventing you from using the author's name to promote derived products. The original 4-Clause BSD had an advertising clause that caused compatibility problems. These distinctions can matter when combining code under different licenses.",
  },
];
