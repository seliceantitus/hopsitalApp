require 'test_helper'

class UnitTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @unit_type = unit_types(:one)
  end

  test "should get index" do
    get unit_types_url, as: :json
    assert_response :success
  end

  test "should create unit_type" do
    assert_difference('UnitType.count') do
      post unit_types_url, params: { unit_type: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show unit_type" do
    get unit_type_url(@unit_type), as: :json
    assert_response :success
  end

  test "should update unit_type" do
    patch unit_type_url(@unit_type), params: { unit_type: {  } }, as: :json
    assert_response 200
  end

  test "should destroy unit_type" do
    assert_difference('UnitType.count', -1) do
      delete unit_type_url(@unit_type), as: :json
    end

    assert_response 204
  end
end
