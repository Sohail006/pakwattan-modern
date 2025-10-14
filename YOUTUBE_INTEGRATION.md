# YouTube Integration Setup

This document explains how to set up YouTube API integration for fetching latest videos from the Pak Wattan School & College of Sciences YouTube channel.

## Features

- ✅ **Real-time Video Fetching**: Automatically fetch latest videos from YouTube channel
- ✅ **Dynamic Thumbnails**: High-quality thumbnails from YouTube
- ✅ **View Counts & Statistics**: Real view counts and engagement metrics
- ✅ **Channel Information**: Subscriber count, video count, channel details
- ✅ **Search Functionality**: Search videos by keywords
- ✅ **Fallback System**: Works without API key using predefined videos
- ✅ **Caching**: Optional caching for better performance
- ✅ **Error Handling**: Graceful fallback when API fails

## Setup Instructions

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **YouTube Data API v3**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy the generated API key

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# YouTube API Configuration
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CHANNEL_ID=UCpakwattanSchoolCollege
YOUTUBE_CHANNEL_USERNAME=@pakwattanSchoolCollege
YOUTUBE_CACHE_DURATION=60
```

### 3. Channel Configuration

Update the channel information in `lib/config.ts`:

```typescript
export const YOUTUBE_CONFIG = {
  CHANNEL_ID: 'UCpakwattanSchoolCollege', // Your channel ID
  CHANNEL_USERNAME: '@pakwattanSchoolCollege', // Your channel username
  // ... other config
}
```

## Usage

### Basic Implementation

```typescript
import { getLatestVideos, getChannelInfo } from '@/lib/youtube-api'

// Fetch latest videos
const videos = await getLatestVideos(10)

// Get channel information
const channelInfo = await getChannelInfo()
```

### Advanced Features

```typescript
import { searchVideos, getVideoCategories } from '@/lib/youtube-api'

// Search videos
const searchResults = await searchVideos('graduation ceremony', 5)

// Get available categories
const categories = getVideoCategories()
```

## Components

### LatestVideos Component

Displays the latest videos from the YouTube channel with:
- Real-time fetching
- Loading states
- Error handling
- Responsive design
- YouTube branding

### VideoGalleryVideos Component

Enhanced video gallery with:
- Mixed content (YouTube + local videos)
- Category filtering
- Search functionality
- YouTube integration

## API Endpoints

The integration uses these YouTube Data API v3 endpoints:

- `channels` - Get channel information
- `search` - Search for videos
- `videos` - Get video details and statistics

## Fallback System

When the YouTube API is not available or fails:

1. **Fallback Videos**: Predefined videos are shown
2. **Channel Info**: Static channel information
3. **Error Handling**: User-friendly error messages
4. **Retry Functionality**: Option to retry failed requests

## Performance Optimization

- **Caching**: Videos are cached for specified duration
- **Lazy Loading**: Images load only when needed
- **Error Boundaries**: Graceful error handling
- **Loading States**: Better user experience

## Security Considerations

When implementing YouTube integration, consider these security aspects:

1. **API Key Protection**: Never expose API keys in client-side code
2. **Rate Limiting**: Implement rate limiting for API calls
3. **Input Validation**: Validate all user inputs
4. **CORS Configuration**: Proper CORS settings for API calls

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify API key is correct
   - Check if YouTube Data API v3 is enabled
   - Ensure API key has proper permissions

2. **Channel Not Found**
   - Verify channel ID is correct
   - Check if channel is public
   - Ensure channel exists and is accessible

3. **Rate Limit Exceeded**
   - Implement caching
   - Reduce API call frequency
   - Use fallback videos

### Debug Mode

Enable debug logging by setting:

```typescript
const DEBUG = process.env.NODE_ENV === 'development'
```

## Monitoring

Track API usage and performance:

- API call frequency
- Error rates
- Cache hit rates
- User engagement metrics

## Future Enhancements

- [ ] Video playlists integration
- [ ] Live stream detection
- [ ] Video analytics
- [ ] Automated video categorization
- [ ] Social media integration
- [ ] Video recommendations

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review API documentation
3. Test with fallback videos
4. Contact development team

---

**Note**: This integration requires a valid YouTube API key for full functionality. The system will work with fallback videos even without an API key.
