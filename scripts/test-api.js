/**
 * API Connection Test Script
 * Tests the connection to the deployed API
 * 
 * Usage: node scripts/test-api.js
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 
  'https://sohailghsno4-001-site8.rtempurl.com';

const tests = [
  {
    name: 'API Health (/api/health)',
    url: `${API_BASE_URL}/api/health`,
    method: 'GET',
    required: true
  },
  {
    name: 'Health Check (/health)',
    url: `${API_BASE_URL}/health`,
    method: 'GET',
    required: false
  },
  {
    name: 'API Base Connectivity',
    url: `${API_BASE_URL}/api`,
    method: 'GET',
    required: false
  }
];

async function runTest(test) {
  const startTime = Date.now();
  try {
    const response = await fetch(test.url, {
      method: test.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const responseTime = Date.now() - startTime;
    let data;
    
    try {
      const text = await response.text();
      if (text) {
        data = JSON.parse(text);
      }
    } catch {
      // Not JSON response, that's okay
      data = { message: 'Non-JSON response' };
    }
    
    return {
      name: test.name,
      status: response.ok ? 'success' : 'error',
      statusCode: response.status,
      responseTime,
      data: data,
      required: test.required || false
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      name: test.name,
      status: 'error',
      error: error.message,
      responseTime,
      required: test.required || false
    };
  }
}

async function runAllTests() {
  console.log('🧪 API Connection Test');
  console.log('='.repeat(50));
  console.log(`API Base URL: ${API_BASE_URL}\n`);
  
  const results = [];
  
  for (const test of tests) {
    console.log(`Testing: ${test.name}...`);
    const result = await runTest(test);
    results.push(result);
    
    if (result.status === 'success') {
      console.log(`✅ ${result.name} - ${result.statusCode} (${result.responseTime}ms)`);
      if (result.data) {
        console.log(`   Response: ${JSON.stringify(result.data, null, 2)}`);
      }
    } else {
      console.log(`❌ ${result.name} - ${result.error || `HTTP ${result.statusCode}`}`);
    }
    console.log('');
  }
  
  // Summary
  console.log('='.repeat(50));
  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  const requiredTests = results.filter(r => r.required);
  const requiredPassed = requiredTests.filter(r => r.status === 'success').length;
  const requiredFailed = requiredTests.filter(r => r.status === 'error').length;
  
  console.log(`Summary: ${successCount} passed, ${errorCount} failed`);
  console.log(`Required Tests: ${requiredPassed} passed, ${requiredFailed} failed`);
  
  // Only fail if required tests fail
  if (requiredFailed > 0) {
    console.log('\n❌ Required tests failed. Please check:');
    console.log('   1. API server is running');
    console.log('   2. API URL is correct');
    console.log('   3. CORS is configured on the API');
    console.log('   4. Network connectivity');
    process.exit(1);
  } else if (errorCount > 0) {
    console.log('\n⚠️  Some optional tests failed, but required tests passed.');
    console.log('✅ API is functional and ready to use!');
    process.exit(0);
  } else {
    console.log('\n✅ All tests passed!');
    process.exit(0);
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});

