require 'test_helper'

class SepcializationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sepcialization = sepcializations(:one)
  end

  test "should get index" do
    get sepcializations_url, as: :json
    assert_response :success
  end

  test "should create sepcialization" do
    assert_difference('Sepcialization.count') do
      post sepcializations_url, params: { sepcialization: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show sepcialization" do
    get sepcialization_url(@sepcialization), as: :json
    assert_response :success
  end

  test "should update sepcialization" do
    patch sepcialization_url(@sepcialization), params: { sepcialization: {  } }, as: :json
    assert_response 200
  end

  test "should destroy sepcialization" do
    assert_difference('Sepcialization.count', -1) do
      delete sepcialization_url(@sepcialization), as: :json
    end

    assert_response 204
  end
end
