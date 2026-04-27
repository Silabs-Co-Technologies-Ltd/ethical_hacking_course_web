export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  topics: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  icon: string;
}

export const courseData: Module[] = [
  {
    id: 'module-1',
    title: 'Introduction to Computers and Networks',
    description: 'The Absolute Basics - Learn what computers are and how they communicate',
    icon: '💻',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'What is a Computer?',
        description: 'Understanding the basic components of a computer',
        duration: '45 min',
        difficulty: 'beginner',
        topics: ['CPU', 'RAM', 'Storage', 'Operating Systems'],
        content: `# What is a Computer?

Before we can understand how to secure or hack a computer, we must first understand what a computer is and how it functions. At its core, a computer is an electronic device that manipulates information, or data.

## The Basic Components

Think of a computer like a human body. It has different parts that perform specific functions, all working together to keep the system running.

### CPU (Central Processing Unit)
The "brain" of the computer. It performs all the calculations and executes instructions. Just like your brain processes thoughts, the CPU processes commands.

### RAM (Random Access Memory)
The computer's short-term memory. It temporarily stores data that the CPU needs quick access to. When the computer turns off, this memory is cleared. Think of it like a whiteboard where you jot down notes for immediate use.

### Storage (Hard Drive/SSD)
The computer's long-term memory. It stores all your files, programs, and the operating system permanently, even when the power is off. Like a filing cabinet where you store documents permanently.

### Input/Output Devices
Devices that allow you to interact with the computer (Input: Keyboard, Mouse) and allow the computer to communicate with you (Output: Monitor, Speakers).

## Operating Systems

An Operating System (OS) is the most important software that runs on a computer. It manages the computer's memory and processes, as well as all of its software and hardware. It also allows you to communicate with the computer without knowing how to speak the computer's language.

The two most common operating systems are:
- **Windows**: Developed by Microsoft, the most widely used OS for personal computers
- **Linux**: An open-source operating system, highly customizable and preferred by security professionals`,
      },
      {
        id: 'lesson-1-2',
        title: 'How Computers Talk: Introduction to Networks',
        description: 'Understanding networks and how computers communicate',
        duration: '50 min',
        difficulty: 'beginner',
        topics: ['LAN', 'WAN', 'IP Addresses', 'MAC Addresses'],
        content: `# How Computers Talk: Introduction to Networks

A single computer is useful, but computers become incredibly powerful when they are connected to each other. This connection is called a network.

## What is a Network?

A computer network is a set of computers sharing resources located on or provided by network nodes. The computers use common communication protocols over digital interconnections to communicate with each other.

## Types of Networks

### LAN (Local Area Network)
A network that connects computers and devices in a limited geographical area, such as a home, school, or office building. Your home Wi-Fi is a LAN.

### WAN (Wide Area Network)
A network that covers a broad area. The Internet is the largest WAN in the world, connecting millions of LANs together.

## Key Networking Concepts

### IP Address
A unique string of numbers separated by periods (e.g., 192.168.1.5) that identifies each computer using the Internet Protocol. Like a street address for a house - it tells the mail carrier exactly where to deliver a letter.

### MAC Address
A unique identifier assigned to a network interface controller for use as a network address. Like a person's Social Security Number or fingerprint - unique to that specific piece of hardware.

### Router
A device that forwards data packets between computer networks. Connects your home network (LAN) to the Internet (WAN). Like a traffic cop directing cars at a busy intersection.

### Switch
A device in a computer network that connects other devices together. Like a multi-plug extension cord, allowing multiple devices to connect to the same network source.`,
      },
      {
        id: 'lesson-1-3',
        title: 'The Internet Explained',
        description: 'Understanding how the Internet works and web protocols',
        duration: '40 min',
        difficulty: 'beginner',
        topics: ['HTTP/HTTPS', 'URLs', 'Web Servers', 'Browsers'],
        content: `# The Internet Explained

The Internet is a vast, global network of networks. It allows computers all over the world to communicate and share information.

## How the Internet Works

When you visit a website, a complex process happens behind the scenes:

1. **The Client (You)**: You use a web browser (like Chrome, Firefox, or Safari) on your computer
2. **The Request**: You type a website address (URL) into your browser. Your browser sends a request over the Internet asking for that website's files
3. **The Server**: The request travels to a server - a powerful computer designed to store website files and "serve" them to clients who request them
4. **The Response**: The server receives the request, finds the files, and sends them back to your browser
5. **The Display**: Your browser receives the files (usually HTML, CSS, and JavaScript) and translates them into the visual website you see

## Web Concepts

### URL (Uniform Resource Locator)
The web address you type into your browser (e.g., https://www.example.com). It tells the browser exactly where to find the resource you want.

### HTTP (Hypertext Transfer Protocol)
The foundation of data communication for the World Wide Web. The protocol used to transfer data between a web server and a web browser.

### HTTPS (Hypertext Transfer Protocol Secure)
The secure version of HTTP. It encrypts the data transferred between your browser and the server, protecting it from eavesdroppers. Always look for the padlock icon in your browser's address bar when entering sensitive information.`,
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Foundations of Cybersecurity',
    description: 'Core security principles and ethical hacking introduction',
    icon: '🔒',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'What is Cybersecurity?',
        description: 'Understanding cybersecurity and the CIA Triad',
        duration: '35 min',
        difficulty: 'beginner',
        topics: ['CIA Triad', 'Confidentiality', 'Integrity', 'Availability'],
        content: `# What is Cybersecurity?

Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.

## The CIA Triad

The core principles of cybersecurity are often summarized by the CIA Triad. This is a model designed to guide policies for information security within an organization.

### Confidentiality
Ensuring that information is not disclosed to unauthorized individuals, entities, or processes. Example: Encrypting a file containing sensitive financial data so only authorized users can read it.

### Integrity
Maintaining and assuring the accuracy and completeness of data over its entire lifecycle. Data cannot be modified in an unauthorized or undetected manner. Example: Using digital signatures to ensure a document has not been altered since it was signed.

### Availability
Ensuring that authorized users have access to information and associated assets when required. Example: Implementing backup power supplies and redundant servers to ensure a website remains accessible even during a hardware failure.`,
      },
      {
        id: 'lesson-2-2',
        title: 'Introduction to Ethical Hacking',
        description: 'White hat hacking, legal considerations, and rules of engagement',
        duration: '45 min',
        difficulty: 'beginner',
        topics: ['White Hat', 'Black Hat', 'Permissions', 'Legal Considerations'],
        content: `# Introduction to Ethical Hacking

When you hear the word "hacker," you might picture a criminal in a dark hoodie stealing credit card numbers. However, hacking itself is simply the act of finding and exploiting vulnerabilities in a system. The intent behind the hacking determines whether it is ethical or malicious.

## White Hat vs. Black Hat

### Black Hat Hackers (Malicious Hackers)
These individuals hack into systems illegally for personal gain, malice, or espionage. They are the criminals of the cyber world.

### White Hat Hackers (Ethical Hackers)
These are security professionals who use their hacking skills for good. They are hired by organizations to find vulnerabilities in their systems before the black hats do. They operate with permission and follow strict rules.

### Grey Hat Hackers
These individuals fall somewhere in between. They might hack into a system without permission to find a vulnerability, but then report it to the owner. This is still illegal and not recommended.

## Legal and Ethical Considerations

Ethical hacking is defined by one crucial element: **Permission**.

Before an ethical hacker touches a system, they must have explicit, written permission from the owner. This is often outlined in a document called the "Rules of Engagement," which specifies exactly what systems can be tested, what methods can be used, and when the testing can occur.

**CRITICAL**: Never practice hacking techniques on systems you do not own or have explicit permission to test.`,
      },
      {
        id: 'lesson-2-3',
        title: 'Common Threats and Vulnerabilities',
        description: 'Understanding malware, phishing, and weak passwords',
        duration: '50 min',
        difficulty: 'beginner',
        topics: ['Malware', 'Phishing', 'Brute Force', 'Social Engineering'],
        content: `# Common Threats and Vulnerabilities

To defend against attacks, you must understand the weapons used by attackers.

## Malware (Malicious Software)

Malware is a broad term for any software intentionally designed to cause damage to a computer, server, client, or computer network.

### Viruses
Programs that attach themselves to legitimate files and spread when those files are executed.

### Worms
Standalone malware programs that replicate themselves to spread to other computers, often over a network, without needing to attach to a host file.

### Trojans
Malware disguised as legitimate software. Users are tricked into downloading and executing them, granting the attacker access to their system.

### Ransomware
A type of malware that encrypts a victim's files. The attacker then demands a ransom payment to restore access to the data.

## Phishing and Social Engineering

Social engineering is the psychological manipulation of people into performing actions or divulging confidential information. It relies on human error rather than technical vulnerabilities.

**Phishing**: The fraudulent practice of sending emails purporting to be from reputable companies in order to induce individuals to reveal personal information, such as passwords and credit card numbers.

## Weak Passwords and Brute Force Attacks

A significant portion of security breaches occur due to weak or reused passwords.

### Brute Force Attack
An attacker uses automated software to guess a password by systematically trying every possible combination of characters until the correct one is found.

### Dictionary Attack
A type of brute force attack that uses a list of common words and phrases (a "dictionary") to guess the password.`,
      },
    ],
  },
  {
    id: 'module-3',
    title: 'Setting Up Your Hacking Lab',
    description: 'Create a safe environment for hands-on practice',
    icon: '🧪',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Virtualization Explained',
        description: 'Understanding virtual machines and why they matter',
        duration: '40 min',
        difficulty: 'beginner',
        topics: ['Virtual Machines', 'VirtualBox', 'Isolation', 'Safety'],
        content: `# Virtualization Explained

Virtualization is essential for creating a safe environment to practice ethical hacking.

## Why Use Virtual Machines?

### Safety
If you accidentally break the operating system inside a virtual machine, it does not affect your host computer. You can simply delete the VM and start over.

### Isolation
VMs are isolated from your main network, preventing any malware or attacks you are testing from spreading to your real devices.

### Flexibility
You can run multiple different operating systems (e.g., Windows, Linux, macOS) simultaneously on a single physical machine.

## What is a Virtual Machine?

A VM is a software emulation of a physical computer. It allows you to run an entire operating system inside a window on your current computer. Think of it like running a computer inside a computer.

## Getting Started with VirtualBox

VirtualBox is a free, open-source virtualization platform. It's perfect for beginners and allows you to create and manage virtual machines easily.`,
      },
      {
        id: 'lesson-3-2',
        title: 'Installing Kali Linux',
        description: 'Download and set up the ethical hacker operating system',
        duration: '60 min',
        difficulty: 'beginner',
        topics: ['Kali Linux', 'Linux Distribution', 'Penetration Testing Tools'],
        content: `# Installing Kali Linux

Kali Linux is a Debian-derived Linux distribution designed for digital forensics and penetration testing. It is maintained and funded by Offensive Security. It comes pre-installed with hundreds of tools used by ethical hackers.

## Why Kali Linux?

Kali Linux is the industry standard for penetration testing and ethical hacking. It includes:
- Nmap (network scanning)
- Metasploit Framework (exploitation)
- Burp Suite (web application testing)
- Aircrack-ng (wireless testing)
- And hundreds more tools

## Downloading and Verifying

1. Go to the official Kali Linux website and navigate to the "Get Kali" section
2. Select "Virtual Machines" and download the pre-built VirtualBox image
3. **Crucial Step**: Always verify the checksum of the downloaded file. The website will provide a SHA256 hash. You can use a tool on your computer to generate the hash of your downloaded file and compare it to the one on the website

## Installation Steps

1. Open VirtualBox
2. Go to File -> Import Appliance
3. Select the Kali Linux VirtualBox image file you downloaded
4. Follow the prompts to import the VM
5. Once imported, select the Kali Linux VM and click "Start"
6. Default login: username "kali", password "kali"`,
      },
      {
        id: 'lesson-3-3',
        title: 'Basic Linux Commands',
        description: 'Master essential Linux command-line operations',
        duration: '55 min',
        difficulty: 'beginner',
        topics: ['Command Line', 'File System', 'Permissions', 'Navigation'],
        content: `# Basic Linux Commands for Hackers

Kali Linux uses a command-line interface (CLI) extensively. While it has a graphical interface, mastering the command line is essential for any ethical hacker.

## Navigating the File System

The Linux file system is organized like a tree, starting from the root directory (/).

### Essential Commands

**pwd** - Print Working Directory
Shows you exactly where you are in the file system.

**ls** - List directory contents
Shows the files and folders in your current location. Use 'ls -l' for detailed listing.

**cd** - Change Directory
Moves you to a different folder. Example: cd /home/kali/Desktop

**mkdir** - Make Directory
Creates a new folder. Example: mkdir my_new_folder

**rm** - Remove
Deletes files or directories. Use with caution!

**cp** - Copy
Copies files or directories. Example: cp file.txt file_copy.txt

**mv** - Move
Moves or renames files. Example: mv oldname.txt newname.txt

**cat** - Concatenate
Displays the contents of a file. Example: cat filename.txt

**grep** - Global Regular Expression Print
Searches for text patterns in files. Example: grep "password" file.txt

## Hands-on Practice

1. Open Terminal in Kali Linux
2. Type 'pwd' to see your current location
3. Type 'mkdir hacking_practice' to create a folder
4. Type 'ls' to verify the folder was created
5. Type 'cd hacking_practice' to move into that folder
6. Type 'touch secret_notes.txt' to create a file
7. Type 'ls' to see the file`,
      },
    ],
  },
  {
    id: 'module-4',
    title: 'Reconnaissance and Footprinting',
    description: 'Gathering information about target systems',
    icon: '🔍',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'Passive Reconnaissance',
        description: 'Gathering information without direct interaction',
        duration: '50 min',
        difficulty: 'intermediate',
        topics: ['OSINT', 'Google Dorking', 'WHOIS', 'Shodan'],
        content: `# Passive Reconnaissance

Reconnaissance is the first phase of any ethical hacking engagement. It involves gathering as much information as possible about the target system or organization.

**Passive Reconnaissance** involves gathering information without directly interacting with the target's systems. This means the target is unaware that you are collecting data about them.

## Open Source Intelligence (OSINT)

OSINT refers to the collection and analysis of information that is gathered from public, or open, sources.

### Google Dorking
Using advanced search operators in Google to find specific, often hidden, information. Example: site:example.com filetype:pdf will find all PDF files hosted on example.com.

### WHOIS
A query and response protocol that is widely used for querying databases that store the registered users or assignees of an Internet resource, such as a domain name. It can reveal who owns a domain and their contact information.

### Shodan
A search engine designed to map and gather information about internet-connected devices and systems. It is often called the "search engine for hackers."

## Hands-on Exercise

1. Open a web browser
2. Go to a WHOIS lookup website (e.g., whois.domaintools.com)
3. Enter a domain name (e.g., example.com)
4. Observe the information returned, such as the registrar and creation date`,
      },
      {
        id: 'lesson-4-2',
        title: 'Active Reconnaissance with Nmap',
        description: 'Network scanning and service enumeration',
        duration: '60 min',
        difficulty: 'intermediate',
        topics: ['Nmap', 'Port Scanning', 'Host Discovery', 'Service Detection'],
        content: `# Active Reconnaissance with Nmap

**Active Reconnaissance** involves directly interacting with the target system to gather information. This leaves a footprint and can be detected by the target's security systems.

## Network Scanning with Nmap

Nmap (Network Mapper) is a free and open-source utility for network discovery and security auditing. It is one of the most essential tools in an ethical hacker's toolkit.

Nmap is used to discover hosts and services on a computer network by sending packets and analyzing the responses.

### Host Discovery
Determining which computers are active on a network.

### Port Scanning
Identifying open ports on a target system. Ports are like doors into a computer; open ports indicate services are running and listening for connections.

## Basic Nmap Commands

**nmap <target>** - Basic scan
Performs a basic scan of the target.

**nmap -p 80,443 <target>** - Scan specific ports
Scans only ports 80 and 443.

**nmap -sV <target>** - Service version detection
Attempts to identify the version of services running.

**nmap -O <target>** - OS detection
Attempts to identify the operating system.

## Hands-on Exercise

**Disclaimer**: Only perform these scans on your own local network or systems you have explicit permission to test.

1. Open Terminal in Kali Linux
2. Find your Kali VM's IP address: ip a
3. Perform a basic scan: nmap <your_kali_ip>
4. Observe the output - it will list any open ports and services`,
      },
    ],
  },
  {
    id: 'module-5',
    title: 'Vulnerability Analysis',
    description: 'Identifying and assessing security weaknesses',
    icon: '⚠️',
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'Understanding Vulnerabilities',
        description: 'CVE, vulnerability databases, and assessment',
        duration: '45 min',
        difficulty: 'intermediate',
        topics: ['CVE', 'Vulnerability Databases', 'Risk Assessment'],
        content: `# Understanding Vulnerabilities

Once you have gathered information and identified open ports and services, the next step is to determine if those services have any known weaknesses.

## What is a Vulnerability?

A vulnerability is a weakness in an information system, system security procedures, internal controls, or implementation that could be exploited or triggered by a threat source.

## Common Vulnerabilities and Exposures (CVE)

The CVE system provides a reference-method for publicly known information-security vulnerabilities and exposures. When a new vulnerability is discovered, it is assigned a unique CVE identifier (e.g., CVE-2021-44228). This allows security professionals to easily reference and track specific vulnerabilities.

## Vulnerability Databases

### NVD (National Vulnerability Database)
The U.S. government repository of standards-based vulnerability management data represented using the Security Content Automation Protocol (SCAP).

### Exploit-DB
An archive of public exploits and corresponding vulnerable software, developed for use by penetration testers and vulnerability researchers.

## Vulnerability Severity

Vulnerabilities are typically rated on a scale from Low to Critical based on their potential impact and exploitability.`,
      },
      {
        id: 'lesson-5-2',
        title: 'Vulnerability Scanning',
        description: 'Using automated tools to find weaknesses',
        duration: '55 min',
        difficulty: 'intermediate',
        topics: ['Nessus', 'OpenVAS', 'Nikto', 'Automated Scanning'],
        content: `# Vulnerability Scanning Tools

Vulnerability scanners are automated tools that scan systems for known vulnerabilities. They compare the services and versions running on a target against a database of known flaws.

## Introduction to Vulnerability Scanners

### Nessus
A proprietary vulnerability scanner developed by Tenable Network Security. It is widely used in the industry and can scan for thousands of vulnerabilities.

### OpenVAS
An open-source vulnerability scanner and manager. A free alternative to Nessus with similar capabilities.

### Nikto
A web server scanner that tests for dangerous files and programs, outdated server software, and other issues.

## How Scanners Work

1. The scanner sends probes to the target system
2. It analyzes the responses
3. It compares findings against a database of known vulnerabilities
4. It generates a report with findings and recommendations

## Important Notes

These tools automate the process of checking for thousands of known vulnerabilities, saving ethical hackers significant time. However, they can produce false positives (reporting a vulnerability that doesn't exist) and false negatives (missing a real vulnerability), so manual verification is always necessary.`,
      },
    ],
  },
  {
    id: 'module-6',
    title: 'System Hacking and Exploitation',
    description: 'Practical exploitation techniques and access methods',
    icon: '💥',
    lessons: [
      {
        id: 'lesson-6-1',
        title: 'Password Attacks',
        description: 'Cracking and testing password security',
        duration: '50 min',
        difficulty: 'intermediate',
        topics: ['Password Hashing', 'Brute Force', 'Dictionary Attacks', 'Hashcat'],
        content: `# Password Attacks

As discussed earlier, weak passwords are a major security risk. Ethical hackers often test the strength of passwords during an engagement.

## Password Cracking Concepts

When you create a password, the system usually doesn't store the plain text password. Instead, it stores a "hash" of the password. A hash is a one-way mathematical function; you can easily turn a password into a hash, but you cannot easily turn a hash back into a password.

Password cracking involves taking a list of guessed passwords, hashing them, and comparing the resulting hashes to the stolen hash from the target system. If the hashes match, the password has been cracked.

## Tools for Password Cracking

### Hashcat
The world's fastest and most advanced password recovery utility. Supports GPU acceleration for faster cracking.

### John the Ripper
A fast password cracker, currently available for many flavors of Unix, Windows, DOS, and OpenVMS.

## Attack Methods

### Dictionary Attack
Uses a list of common words and phrases to guess passwords.

### Brute Force Attack
Tries every possible combination of characters.

### Hybrid Attack
Combines dictionary words with numbers and special characters.

## Best Practices

- Always use strong, unique passwords
- Enable multi-factor authentication
- Use a password manager
- Never reuse passwords across different services`,
      },
      {
        id: 'lesson-6-2',
        title: 'Introduction to Metasploit',
        description: 'Using the Metasploit Framework for exploitation',
        duration: '60 min',
        difficulty: 'intermediate',
        topics: ['Metasploit', 'Exploits', 'Payloads', 'Modules'],
        content: `# Introduction to Metasploit Framework

The Metasploit Framework is a Ruby-based, modular penetration testing platform that enables you to write, test, and execute exploit code. It is an incredibly powerful tool used by security professionals worldwide.

## Metasploit Modules

Metasploit is built around modules, which are pieces of software that perform specific tasks.

### Exploits
Modules that take advantage of a vulnerability to deliver a payload.

### Payloads
Code that runs on the target system after a successful exploit (e.g., opening a command shell).

### Auxiliaries
Modules that perform scanning, fuzzing, and other tasks that don't involve exploitation.

## The Exploitation Process

1. Identify a vulnerability on the target system (e.g., an outdated service)
2. Search Metasploit for an exploit module that targets that specific vulnerability
3. Configure the exploit module with the target's IP address and other necessary settings
4. Select a payload to deliver upon successful exploitation
5. Execute the exploit. If successful, the payload will run, granting access to the target system

## Basic Metasploit Commands

**msfconsole** - Start the Metasploit console

**search <keyword>** - Search for modules

**use <module>** - Select a module to use

**set RHOST <IP>** - Set the remote host

**exploit** - Execute the exploit

## Important Disclaimer

Only use Metasploit on systems you own or have explicit written permission to test. Unauthorized access is illegal.`,
      },
    ],
  },
  {
    id: 'module-7',
    title: 'Web Application Security',
    description: 'Understanding and testing web vulnerabilities',
    icon: '🌐',
    lessons: [
      {
        id: 'lesson-7-1',
        title: 'Web Application Basics',
        description: 'How web applications work and common technologies',
        duration: '45 min',
        difficulty: 'intermediate',
        topics: ['Client-Side', 'Server-Side', 'HTML', 'JavaScript', 'Databases'],
        content: `# How Web Applications Work

Web applications are programs that run on a web server and are accessed through a web browser. They are complex systems involving multiple technologies.

## Client-Side vs. Server-Side

### Client-Side (Front-end)
The part of the application that runs in the user's web browser. It is built using HTML (structure), CSS (styling), and JavaScript (interactivity).

### Server-Side (Back-end)
The part of the application that runs on the web server. It handles logic, database interactions, and user authentication. Common languages include Python, PHP, Java, and Ruby.

## Common Web Technologies

### HTML (HyperText Markup Language)
The standard markup language for creating web pages. It provides the structure and content.

### CSS (Cascading Style Sheets)
Used to style and layout web pages. It controls how the HTML elements are displayed.

### JavaScript
A programming language that runs in the browser. It adds interactivity and dynamic behavior to web pages.

### Databases
Store and manage data for web applications. Common databases include MySQL, PostgreSQL, and MongoDB.

## How a Web Request Works

1. User enters a URL in their browser
2. Browser sends an HTTP request to the web server
3. Server processes the request and retrieves data from the database if needed
4. Server sends back an HTTP response with HTML, CSS, and JavaScript
5. Browser renders the response and displays the web page to the user`,
      },
      {
        id: 'lesson-7-2',
        title: 'OWASP Top 10 Vulnerabilities',
        description: 'Understanding the most critical web security risks',
        duration: '60 min',
        difficulty: 'intermediate',
        topics: ['Injection', 'XSS', 'CSRF', 'Authentication', 'OWASP'],
        content: `# Common Web Vulnerabilities (OWASP Top 10)

The Open Web Application Security Project (OWASP) is a nonprofit foundation that works to improve the security of software. They publish the OWASP Top 10, a standard awareness document for developers and web application security.

## Key Vulnerabilities

### Injection (e.g., SQL Injection)
Occurs when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

**Example**: An attacker enters ' OR '1'='1 in a login form to bypass authentication.

### Cross-Site Scripting (XSS)
Occurs when an application includes untrusted data in a web page without proper validation or escaping. XSS allows attackers to execute scripts in the victim's browser, which can hijack user sessions, deface web sites, or redirect the user to malicious sites.

### Cross-Site Request Forgery (CSRF)
An attack that forces an authenticated user to submit a request to a web application without their knowledge.

### Broken Authentication
Compromised account credentials, session tokens, or weak password policies.

### Sensitive Data Exposure
Failure to protect sensitive data such as financial information, healthcare data, or personally identifiable information.

### XML External Entities (XXE)
Exploits XML processors to read files or perform denial-of-service attacks.

### Broken Access Control
Users can act outside their intended permissions.

### Security Misconfiguration
Insecure default configurations, incomplete setups, or open cloud storage.

### Using Components with Known Vulnerabilities
Using libraries, frameworks, or other software components with known security flaws.

### Insufficient Logging and Monitoring
Lack of security event logging and monitoring capabilities.`,
      },
      {
        id: 'lesson-7-3',
        title: 'Using Burp Suite',
        description: 'Web application testing with Burp Suite Community',
        duration: '55 min',
        difficulty: 'intermediate',
        topics: ['Burp Suite', 'Proxy', 'Request Interception', 'Web Testing'],
        content: `# Using Burp Suite (Basics)

Burp Suite is an integrated platform for performing security testing of web applications. It is the industry standard tool for web application hacking.

## What is Burp Suite?

Burp Suite is a comprehensive web application security testing platform. It includes tools for:
- Proxying web traffic
- Scanning for vulnerabilities
- Fuzzing inputs
- Analyzing responses
- Exploiting vulnerabilities

## Proxying Web Traffic

The core feature of Burp Suite is its intercepting proxy. It sits between your web browser and the target web server.

### How It Works

1. Your browser sends a request
2. Burp Suite intercepts the request and pauses it
3. You can inspect and modify the request in Burp Suite before sending it to the server
4. The server sends a response
5. Burp Suite intercepts the response, allowing you to inspect it before it reaches your browser

## Key Features

### Request Interception
Allows you to modify HTTP requests before they are sent to the server.

### Response Analysis
Examine server responses to identify potential vulnerabilities.

### Repeater
Resend modified requests to test different inputs.

### Intruder
Automate attacks by sending multiple variations of requests.

### Scanner
Automatically scan for common vulnerabilities.

## Getting Started

1. Download Burp Suite Community Edition (free)
2. Configure your browser to use Burp as a proxy
3. Visit a web application
4. Intercept requests and analyze them
5. Modify requests to test for vulnerabilities

## Important Notes

Only use Burp Suite on web applications you own or have explicit permission to test. Unauthorized testing is illegal.`,
      },
    ],
  },
  {
    id: 'module-8',
    title: 'Wireless Network Security',
    description: 'Understanding and testing wireless networks',
    icon: '📡',
    lessons: [
      {
        id: 'lesson-8-1',
        title: 'Wireless Network Basics',
        description: 'Wi-Fi standards, security protocols, and vulnerabilities',
        duration: '50 min',
        difficulty: 'intermediate',
        topics: ['Wi-Fi', 'WEP', 'WPA', 'WPA2', 'WPA3', 'Monitor Mode'],
        content: `# Wireless Network Basics

Wireless networks (Wi-Fi) transmit data over radio waves, making them inherently more vulnerable to interception than wired networks.

## Wi-Fi Security Standards

### WEP (Wired Equivalent Privacy)
An old and highly insecure standard. It can be cracked in minutes and should never be used.

### WPA (Wi-Fi Protected Access)
An improvement over WEP, but still has vulnerabilities.

### WPA2 (Wi-Fi Protected Access 2)
The current standard for wireless security. WPA2 is widely used and is secure if a strong password is used.

### WPA3 (Wi-Fi Protected Access 3)
The newest standard, offering improved security features, but not yet universally adopted.

## How Wi-Fi Works

Wireless networks use radio waves to transmit data between devices and a wireless access point (router).

## Monitor Mode

To analyze wireless traffic, a wireless network adapter must support "monitor mode." Normal adapters only capture traffic destined for their specific MAC address. Monitor mode allows the adapter to capture all wireless traffic in the air, regardless of the destination.

## Wireless Security Best Practices

- Use WPA2 or WPA3 encryption
- Use strong, unique passwords
- Disable WPS (Wi-Fi Protected Setup)
- Hide your SSID (network name)
- Keep firmware updated
- Use a VPN for additional security`,
      },
      {
        id: 'lesson-8-2',
        title: 'Wireless Network Attacks',
        description: 'Understanding WPA/WPA2 cracking and wireless vulnerabilities',
        duration: '60 min',
        difficulty: 'advanced',
        topics: ['4-Way Handshake', 'Aircrack-ng', 'Dictionary Attack', 'Hashcat'],
        content: `# Cracking WPA/WPA2 (Conceptual)

The most common method for attacking WPA/WPA2 networks involves capturing the "handshake."

## The 4-Way Handshake

When a device connects to a WPA2 network, it performs a 4-way handshake with the router to establish a secure connection and exchange encryption keys.

An attacker can use tools (like the Aircrack-ng suite) to monitor the network and capture this handshake. Once the handshake is captured, the attacker can take it offline and use a dictionary attack or brute force attack (using tools like Hashcat) to try and guess the password that generated the handshake.

## Tools for Wireless Testing

### Aircrack-ng Suite
A complete suite of tools for assessing Wi-Fi network security.

**airmon-ng** - Put wireless adapter in monitor mode

**airodump-ng** - Capture wireless traffic

**aireplay-ng** - Generate traffic for capturing handshakes

**aircrack-ng** - Crack WPA/WPA2 passwords

### Hashcat
GPU-accelerated password cracking tool.

## Attack Process

1. Put wireless adapter in monitor mode
2. Scan for available networks
3. Select a target network
4. Capture the 4-way handshake
5. Use dictionary attack or brute force to crack the password

## Important Disclaimer

Only perform wireless network testing on networks you own or have explicit written permission to test. Unauthorized access to wireless networks is illegal.

## Defense

- Use strong, complex passwords (20+ characters)
- Use WPA3 if available
- Disable WPS
- Keep firmware updated
- Monitor connected devices`,
      },
    ],
  },
  {
    id: 'module-9',
    title: 'Post-Exploitation and OpSec',
    description: 'Maintaining access and operational security',
    icon: '🛡️',
    lessons: [
      {
        id: 'lesson-9-1',
        title: 'Operational Security (OpSec)',
        description: 'Protecting your identity and methods during engagements',
        duration: '45 min',
        difficulty: 'intermediate',
        topics: ['VPN', 'Proxies', 'Tor', 'Anonymity', 'Logging'],
        content: `# Operational Security (OpSec)

Operational Security (OpSec) is the process of protecting individual pieces of data that could be grouped together to give the bigger picture. For ethical hackers, this means protecting their identity and the methods they use during an engagement.

## Why OpSec Matters

Even ethical hackers need to protect themselves. Your activities could be traced back to you, and you need to ensure you're not leaving evidence that could be misused.

## Tools for Anonymity

### VPN (Virtual Private Network)
Creates a secure, encrypted connection over a less secure network, such as the internet. It hides your real IP address by routing your traffic through a server in another location.

### Proxies
Intermediary servers that route your requests. They can hide your IP address but generally do not encrypt your traffic like a VPN does.

### Tor (The Onion Router)
A network that directs internet traffic through a free, worldwide, volunteer overlay network consisting of more than seven thousand relays to conceal a user's location and usage from anyone conducting network surveillance or traffic analysis.

## Best Practices

- Never use your real name or personal information
- Use separate accounts for different activities
- Clear browser history and cache regularly
- Use encrypted communication tools
- Disable JavaScript in Tor Browser
- Keep your system updated
- Use strong, unique passwords
- Enable multi-factor authentication
- Document your activities for the engagement report
- Maintain a clean audit trail`,
      },
      {
        id: 'lesson-9-2',
        title: 'Post-Exploitation Fundamentals',
        description: 'Actions after successful compromise',
        duration: '55 min',
        difficulty: 'advanced',
        topics: ['Privilege Escalation', 'Persistence', 'Data Exfiltration', 'Covering Tracks'],
        content: `# Post-Exploitation Fundamentals

Post-exploitation refers to the actions taken *after* an attacker has successfully compromised a system.

## Key Post-Exploitation Concepts

### Privilege Escalation
If an attacker gains access as a standard user, their first goal is often to escalate their privileges to an administrator or "root" user, granting them full control over the system.

**Vertical Escalation**: Gaining higher privileges on the same system

**Horizontal Escalation**: Gaining access to other user accounts with similar privileges

### Maintaining Access (Persistence)
Attackers want to ensure they can return to the compromised system later, even if the system is rebooted or the original vulnerability is patched. They do this by installing backdoors or creating new user accounts.

**Backdoors**: Hidden access points that allow unauthorized access

**Rootkits**: Malicious software that hides the attacker's presence

**Scheduled Tasks**: Malicious programs set to run at specific times

### Data Exfiltration
The unauthorized transfer of data from a computer or other device. This is often the ultimate goal of a malicious attack.

### Covering Tracks
Removing evidence of the attack from logs and system files.

## Ethical Hacker Perspective

As an ethical hacker, you should:
- Document all access gained
- Note all changes made to the system
- Preserve evidence for the report
- **Never** cover your tracks or delete logs
- Provide recommendations for remediation
- Maintain a clear audit trail of your activities

## Important Notes

Post-exploitation techniques should only be used on systems you own or have explicit written permission to test. Unauthorized access is illegal.`,
      },
    ],
  },
  {
    id: 'module-10',
    title: 'Reporting and Career Path',
    description: 'Documenting findings and advancing in cybersecurity',
    icon: '📋',
    lessons: [
      {
        id: 'lesson-10-1',
        title: 'Writing Penetration Test Reports',
        description: 'Creating professional security assessment reports',
        duration: '50 min',
        difficulty: 'intermediate',
        topics: ['Report Structure', 'Executive Summary', 'Findings', 'Recommendations'],
        content: `# Writing a Penetration Test Report

The most important deliverable of an ethical hacking engagement is the final report. If you find a critical vulnerability but cannot clearly explain it to the client, your work is useless.

## Key Sections of a Report

### Executive Summary
A high-level overview of the engagement, the key findings, and the overall risk posture of the organization. This is written for non-technical management.

**Should include**:
- Scope of the engagement
- Dates of testing
- Overall risk rating
- Number and severity of vulnerabilities found
- Key recommendations

### Methodology
A description of the tools and techniques used during the assessment.

**Should include**:
- Testing phases (reconnaissance, scanning, exploitation, etc.)
- Tools used
- Testing timeline
- Limitations and assumptions

### Detailed Findings
A technical breakdown of each vulnerability discovered.

**Each finding should include**:
- Vulnerability title and CVE (if applicable)
- Severity rating (Critical, High, Medium, Low)
- Description of the vulnerability
- Affected systems
- Proof of Concept (PoC) demonstrating how it was exploited
- Potential impact if exploited
- Remediation recommendations (how to fix it)
- References to relevant standards or best practices

### Recommendations
High-level recommendations for improving security posture.

**Should include**:
- Immediate actions to take
- Short-term improvements
- Long-term security strategy
- Prioritization of fixes

### Appendices
Additional technical details, screenshots, logs, or other supporting documentation.

## Report Writing Best Practices

- Use clear, professional language
- Avoid technical jargon when possible, or explain it
- Include screenshots and diagrams
- Be specific about findings
- Provide actionable recommendations
- Organize findings by severity
- Proofread carefully
- Use consistent formatting
- Include executive summary first for busy executives
- Provide detailed technical sections for IT staff`,
      },
      {
        id: 'lesson-10-2',
        title: 'The Future of Ethical Hacking',
        description: 'Career paths, certifications, and continuous learning',
        duration: '45 min',
        difficulty: 'beginner',
        topics: ['Certifications', 'Career Paths', 'Continuous Learning', 'Industry Trends'],
        content: `# The Future of Ethical Hacking

Cybersecurity is a constantly evolving field. New technologies bring new vulnerabilities, and ethical hackers must continuously learn to stay ahead of malicious actors.

## Career Paths in Cybersecurity

### Penetration Tester
Conducts authorized security testing on systems and networks to identify vulnerabilities.

### Security Analyst
Monitors systems for security breaches and implements security measures.

### Incident Response Specialist
Responds to and investigates security incidents.

### Security Architect
Designs secure systems and networks.

### Security Engineer
Develops and implements security solutions.

### Threat Intelligence Analyst
Researches and analyzes emerging threats and vulnerabilities.

## Industry-Recognized Certifications

### CompTIA Security+
A great entry-level certification covering foundational security concepts. Prerequisites: CompTIA A+ and Network+ (or equivalent experience).

### Certified Ethical Hacker (CEH)
A widely recognized certification focusing on hacking tools and techniques. Offered by the EC-Council.

### Offensive Security Certified Professional (OSCP)
A highly respected, entirely hands-on certification that requires you to successfully hack several machines in a lab environment. Considered one of the most challenging and valuable certifications.

### GIAC Security Essentials (GSEC)
A foundational security certification from GIAC.

### Certified Information Systems Security Professional (CISSP)
A high-level certification for experienced security professionals.

## Continuous Learning

The cybersecurity field is constantly changing. To stay relevant:
- Follow security blogs and news sites
- Participate in capture-the-flag (CTF) competitions
- Practice on platforms like HackTheBox and TryHackMe
- Attend security conferences
- Join local security groups and meetups
- Read security research papers
- Experiment in your own lab environment

## The Importance of Ethics

Remember, the skills you have learned in this course are powerful. Always use them responsibly, ethically, and legally. The cybersecurity community values professionals who operate with integrity and respect for the law.

## Final Thoughts

Ethical hacking is a rewarding career that allows you to use your technical skills to protect organizations and individuals. As you continue your journey, remember that the best hackers are not just technically skilled—they are also ethical, curious, and committed to continuous learning.

Good luck on your ethical hacking journey!`,
      },
    ],
  },
];
