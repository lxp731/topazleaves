# GitLab CI/CD 经典配置脚本

## 配置文件示例

```bash
{{#include ../mdbook-files/.gitlab-ci.yml}}
```

## 配置文件详解

### 1. 基础结构
```yaml
# 定义流水线阶段
stages:
  - build
  - test
  - deploy

# 定义全局变量
variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: ""
```

### 2. 构建阶段
```yaml
build-job:
  stage: build
  script:
    - echo "开始构建..."
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker tag myapp:$CI_COMMIT_SHA myapp:latest
  artifacts:
    paths:
      - build/
    expire_in: 1 week
```

### 3. 测试阶段
```yaml
test-job:
  stage: test
  script:
    - echo "运行单元测试..."
    - npm test
    - echo "运行集成测试..."
    - npm run test:integration
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
```

### 4. 部署阶段
```yaml
deploy-job:
  stage: deploy
  script:
    - echo "部署到生产环境..."
    - kubectl apply -f k8s/
  environment:
    name: production
    url: https://example.com
  only:
    - main
```

## 常用配置选项

### 1. 镜像配置
```yaml
# 使用特定 Docker 镜像
image: node:16-alpine

# 使用服务容器
services:
  - postgres:13-alpine
  - redis:6-alpine

# 定义服务变量
variables:
  POSTGRES_DB: myapp_test
  POSTGRES_USER: runner
  POSTGRES_PASSWORD: ""
```

### 2. 缓存配置
```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/
  policy: pull-push
```

### 3. 制品配置
```yaml
artifacts:
  paths:
    - dist/
    - coverage/
  exclude:
    - node_modules/
  expire_in: 30 days
  when: on_success
```

### 4. 触发条件
```yaml
# 仅针对特定分支
only:
  - main
  - develop

# 排除特定分支
except:
  - tags

# 使用规则
rules:
  - if: $CI_COMMIT_BRANCH == "main"
    when: always
  - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    when: manual
```

## 高级功能

### 1. 并行执行
```yaml
parallel: 5
```

### 2. 重试机制
```yaml
retry:
  max: 2
  when:
    - runner_system_failure
    - stuck_or_timeout_failure
```

### 3. 超时设置
```yaml
timeout: 1h 30m
```

### 4. 资源限制
```yaml
resource_group: production-deploy
```

## 实用脚本示例

### 1. Docker 构建和推送
```yaml
build-and-push:
  stage: build
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:latest
```

### 2. Kubernetes 部署
```yaml
deploy-to-k8s:
  stage: deploy
  script:
    - echo $KUBECONFIG | base64 -d > kubeconfig.yaml
    - export KUBECONFIG=kubeconfig.yaml
    - kubectl config use-context production
    - kubectl apply -f k8s/deployment.yaml
    - kubectl rollout status deployment/myapp
```

### 3. 数据库迁移
```yaml
database-migration:
  stage: deploy
  script:
    - npm run db:migrate
  environment:
    name: production
  only:
    - main
```

### 4. 安全检查
```yaml
security-scan:
  stage: test
  script:
    - npm audit
    - trivy image --exit-code 1 $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  allow_failure: true
```

## 环境变量管理

### 1. 预定义变量
```yaml
# 使用 GitLab 预定义变量
script:
  - echo "项目ID: $CI_PROJECT_ID"
  - echo "提交SHA: $CI_COMMIT_SHA"
  - echo "分支名称: $CI_COMMIT_REF_NAME"
  - echo "流水线ID: $CI_PIPELINE_ID"
```

### 2. 项目变量
在 GitLab 项目设置中定义：
- `CI_REGISTRY_USER`
- `CI_REGISTRY_PASSWORD`
- `KUBECONFIG`
- `AWS_ACCESS_KEY_ID`

### 3. 文件变量
```yaml
variables:
  KUBECONFIG: $KUBECONFIG_FILE
```

## 流水线优化

### 1. 依赖缓存
```yaml
cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/
```

### 2. 阶段依赖
```yaml
test-job:
  stage: test
  dependencies:
    - build-job
  needs: ["build-job"]
```

### 3. 条件执行
```yaml
deploy-review:
  stage: deploy
  script:
    - echo "部署到预览环境"
  environment:
    name: review/$CI_COMMIT_REF_NAME
    url: https://$CI_ENVIRONMENT_SLUG.example.com
  only:
    - branches
  except:
    - main
```

### 4. 手动确认
```yaml
production-deploy:
  stage: deploy
  script:
    - echo "部署到生产环境"
  when: manual
  only:
    - main
```

## 故障排除

### 1. 调试模式
```yaml
# 启用调试输出
variables:
  CI_DEBUG_TRACE: "true"
```

### 2. 日志查看
```bash
# 查看流水线日志
gitlab-ci-lint .gitlab-ci.yml

# 本地测试
gitlab-runner exec docker build-job
```

### 3. 性能分析
```yaml
# 添加时间戳
before_script:
  - date
after_script:
  - date
```

### 4. 错误处理
```yaml
script:
  - some_command || exit_code=$?
  - if [ $exit_code -ne 0 ]; then
      echo "命令失败，但继续执行";
    fi
```

## 最佳实践

### 1. 配置文件组织
```yaml
# 使用 include 引入其他文件
include:
  - local: '/templates/.gitlab-ci-template.yml'
  - project: 'mygroup/myproject'
    file: '/templates/.gitlab-ci-template.yml'
  - remote: 'https://example.com/ci-template.yml'
```

### 2. 模板化配置
```yaml
# 定义模板
.docker-build:
  script:
    - docker build -t $IMAGE_TAG .
    - docker push $IMAGE_TAG

# 使用模板
build-app:
  extends: .docker-build
  variables:
    IMAGE_TAG: $CI_REGISTRY_IMAGE/app:$CI_COMMIT_SHA
```

### 3. 安全性考虑
```yaml
# 避免在日志中输出敏感信息
script:
  - echo "正在部署..."
  # 不要这样做：
  # - echo "密码是: $PASSWORD"
```

### 4. 性能优化
```yaml
# 使用更小的基础镜像
image: alpine:latest

# 并行执行独立任务
test-unit:
  stage: test
  script: npm run test:unit

test-integration:
  stage: test
  script: npm run test:integration
```

## 扩展功能

### 1. Webhook 集成
```yaml
# 触发其他流水线
trigger:
  project: mygroup/myproject
  branch: main
  strategy: depend
```

### 2. 质量门禁
```yaml
quality-gate:
  stage: test
  script:
    - sonar-scanner
    - check-coverage.sh
  allow_failure: false
```

### 3. 通知配置
```yaml
# 流水线状态通知
notify-slack:
  stage: .post
  script:
    - curl -X POST -H 'Content-type: application/json' --data '{"text":"流水线 $CI_PIPELINE_ID 已完成"}' $SLACK_WEBHOOK_URL
  when: always
```

通过合理配置 GitLab CI/CD，可以实现自动化构建、测试和部署流程，提高开发效率和代码质量。建议从简单配置开始，逐步添加高级功能。