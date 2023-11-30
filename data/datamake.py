import json

landDataJson="global_land_tem.json"
oceanDataJson="global_ocean_tem.json"

with open(landDataJson,"r") as file1:
    land_data = json.load(file1)

with open(oceanDataJson,"r") as file2:
    ocean_data = json.load(file2)

# 두 데이터의 연도 목록 추출
years = sorted(set(ocean_data["data"].keys()).union(set(land_data["data"].keys())))

# 변환된 데이터를 담을 리스트 초기화
combined_data = []

# 각 연도에 대해 데이터를 변환하여 리스트에 추가
for year in years:
    ocean_value = float(ocean_data["data"].get(year, 0))
    land_value = float(land_data["data"].get(year, 0))
    
    combined_data.append({"year": year, "ocean": ocean_value, "land": land_value})

year

print(combined_data)

json_output_path = "global_tem.json"

# combined_data를 JSON 파일로 내보내기
with open(json_output_path, "w") as output_file:
    json.dump(combined_data, output_file, indent=4)

print(f"데이터가 {json_output_path} 파일로 성공적으로 내보내졌습니다.")