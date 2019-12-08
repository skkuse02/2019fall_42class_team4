echo "Testing item API"
mocha test/test_item.js --timeout 30000
echo "Testing user API"
mocha test/test_user.js --timeout 30000
echo "Testing review API"
mocha test/test_review.js --timeout 30000
echo "Testing login & logout API"
mocha test/test_loginout.js --timeout 30000
