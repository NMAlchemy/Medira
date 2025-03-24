import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

function Share() {
  const shareUrl = 'http://yourwebsite.com';
  const title = 'Join our repair platform!';

  return (
    <div className="container">
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} />
      </TwitterShareButton>
    </div>
  );
}

export default Share;
