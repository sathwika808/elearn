// import { CommonModule } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-refer',
  standalone: true, // ensure standalone mode for imports to work
  imports: [CommonModule, FormsModule],
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.css'] // corrected to styleUrls (plural)
})
export class ReferComponent {
  referralCode = 'ELRN-8493';
  showShare = false;
  copied = false;

  toggleShare() {
    this.showShare = !this.showShare;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.referralCode).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }

  shareVia(platform: string) {
    const referralMessage = `Join me on E-Learn and earn rewards! Use my referral code: ${this.referralCode}`;
    const currentUrl = window.location.href;
    const fullMessage = `${referralMessage} 👉 ${currentUrl}`;

    let shareLink = '';
    switch (platform) {
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(referralMessage)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=Join E-Learn!&body=${encodeURIComponent(fullMessage)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullMessage)}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank');
    }
  }
}
