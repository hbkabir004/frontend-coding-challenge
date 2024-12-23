import { UserAgent } from "@/views/userAgent";
import { headers } from 'next/headers';

const UserAgentRoot = async () => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') ?? 'Unknown User Agent';

  return <UserAgent userAgent={userAgent} />;
};

export default UserAgentRoot;
