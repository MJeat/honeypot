
## Key points:
- The real server and the honeypot use 2 different IPs and network subnetting. <br>
- The real server does not appear online. It can only be accessed by the company’s VPN or wifi. On the other hand, a honeypot is intentionally exposed on the Internet. When the hacker scans the URL, it’s actually the honeypot link, not the real company link (it’s not even public). <br>
- The honeypot is outside of the firewall. The reason is that when we learn about their IPs, we can block them in the firewall immediately. <br>
--In front of the firewall is the honeypot <br>
--Behind the firewall is the real company server. <br>
- The honeypot does not provide 100% protection. It only wastes hackers’ time, sends their info to the SOC team, and the SOC team learns their attacks and improves their threat intelligence, defence system, and SIEM tools. It is a matter of time until the hacker realizes they have been trapped and finds the real server. <br>
- As a SOC or related professional, your role is to study hackers, their techniques, and your system/resources deployment as soon as possible, and develop a better defense and system redesign/reallocate. <br>
